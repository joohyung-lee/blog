import React, { Component, propTypes } from 'react';
import {Link} from 'react-router-dom';
//components
import {AuthLogin} from 'containers/auth'

//containers

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from 'redux/modal';
//css
import 'styles/header/index.scss';

class Header extends Component {
    componentDidMount(){
        window.addEventListener('click',this.outHide);
    }
    //바깥 클릭 시 메뉴드랍 접기
    outHide=(e)=>{
        const {modalView,modal}=this.props;
        if(modal.mymenu.open){
            modalView.closeModal({
                modalName:'mymenu'
            });
        }
    }
    //메뉴 드랍다운
    dropdown=(e)=>{
        e.stopPropagation();
        const {modal,modalView}=this.props;
        if(modal.mymenu.open){
            modalView.closeModal({
                modalName:'mymenu'
            }); 
        }else{
            modalView.openModal({
                modalName:'mymenu'
            }); 
        }      
    }
    render(){
        const{modal}=this.props;
        if(this.props.mode){
            return (
                <div className="global-nav">
                    <div className="logo">
                        <Link to='/main'><h1>JOOMATION</h1></Link>
                        
                    </div>    
                    <div className="nav-contents">
                        <ul>
                            <li>About</li>
                        </ul>
                    </div>
                    <AuthLogin open={modal['mymenu'].open} dropdown={this.dropdown}/>
                    
                </div>
            );
        }else{
            return <div></div>
        }
    }
};
Header.propTypes = {
    mode: React.PropTypes.bool,
};
Header.defaultProps={
    mode: true,
}
export default connect(
    (state)=>({
        modal:state.modal.toJS(),
    }),
    (dispatch)=>({
        modalView: bindActionCreators(modalActions, dispatch)
    })
)(Header);