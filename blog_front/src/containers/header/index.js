import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
//components
import {AuthLogin} from 'containers/auth'

//containers
//images
import SearchIcon from 'images/searchIcon';
//redux
import * as httpRequest from 'redux/helper/httpRequest';
import * as commonAction from 'redux/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from 'redux/modal';
class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            searchValue:'',
            searchView:false
        }
    }
    componentDidMount(){
        
        window.addEventListener('click',this.outHide);
        let re = /(search)/;
        let isSearch = re.test(this.props.location.pathname);
        if(isSearch){
            this.setState({
                searchView:true
            })
        }
    }
    componentWillReceiveProps(nextProps) {
    const locationChange=this.props.location!==nextProps.location;
    let re = /(search)/;
    let isSearch = re.test(nextProps.location.pathname);
    if(locationChange){
        if(isSearch){
            this.setState({
                searchView:true
            })
        }else{
            this.setState({
                searchView:false
            })
        }
    }
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
    handleChange=(e)=>{
        this.setState({
            searchValue:e.target.value
        })
        const {handleHeader}=this.props;
        let blank_pattern = /^\s+|\s+$/g;
        if(e.target.value.replace( blank_pattern, '' ) === "" ){
            handleHeader.searchValue({
                searchValue:""
            });
            
        }else{
            handleHeader.searchValue({
                searchValue:e.target.value
            });
            
        }
        
    }
    searchClick=(e)=>{
        e.stopPropagation();
        this.moveSearch();
        this.setState({
            searchView:true
        })
    }
    moveSearch=()=>{
        let re = /(search)/;
        let isSearch = re.test(this.props.location.pathname);
        if(!isSearch){
            this.props.history.push('/search');
        }
    }
    backSearch=(e)=>{
        e.stopPropagation();
        this.setState({
            searchView:false
        });
        
        // if(this.props.history.action==='POP'){
        //     return false;
        // }else if(this.props.location.pathname==='/search'){
        //     return this.props.history.goBack();
        // }else{
        //     return false;
        // }
    }
    handleSearch=(e)=>{
        const{common}=this.props;
        if(e.keyCode === 13){
            if(this.props.location.pathname===`/search/${common.searchValue.toLowerCase()}`){
                return false;
            }else{
                if(common.searchValue!=='')
                return this.props.history.push(`/search/${common.searchValue.toLowerCase()}`)
            }
        }
    }
    render(){
        const{modal,common}=this.props;
        const {searchView}=this.state;
        if(this.props.mode){
            return (
                <div className="global-nav">
                    <div className="logo">
                        <a href='/home'><h1>JOOMATION</h1></a>
                        
                    </div>    
                    <div className="nav-contents">
                        <ul>
                            <li>About</li>
                            
                        </ul>
                    </div>
                    <div className="right-contents">
                        <SearchIcon open={searchView} 
                        isBright={common.isBright}
                        onClick={this.searchClick}
                        onChange={this.handleChange} 
                        value={common.searchValue} 
                        onKeyDown={this.handleSearch}
                        searchClose={this.backSearch}/>

                        <AuthLogin open={modal['mymenu'].open} header={false} dropdown={this.dropdown} avatarFace={modal['mymenu'].open}/>
                    </div>
                    
                </div>
            );
        }else{
            return <div></div>
        }
    }
};
Header.propTypes = {
    mode: PropTypes.bool,
};
Header.defaultProps={
    mode: true,
}
export default withRouter(connect(
    (state)=>({
        common:state.common.toJS(),
        modal:state.modal.toJS(),
    }),
    (dispatch)=>({
        modalView: bindActionCreators(modalActions, dispatch),
        get:bindActionCreators(httpRequest,dispatch),
        handleHeader:bindActionCreators(commonAction,dispatch),
    })
)(Header));