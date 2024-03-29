import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane,Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import APICaller from '../../services/apiConnecter';
import dateTime from '../../services/date-time';
// import { AppSwitch } from '@coreui/react'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultAside extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '2'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }



  _renderNotis = ()=>{
    const {notis} = this.props;
    const notiss = notis.reverse();
    

    return notiss.map(e=>{
      const data = JSON.parse(e.message);
      const Old = JSON.parse(data.old);
      const New = JSON.parse(data.new);
      let message_content = "";
      if(data.type==="shop"){
        message_content = `Shop ${Old.name} has been changed at products count to ${New.products_count}`
      }else{
        message_content = `Product ${Old.title} has been changed at: \n
        ${New.changedAt.map(e=>`${e}: ${Old[e]}->${New[e]}\n`)}`
      }
      return(
        <div key={e.id}>
            <div className="message">
              <div>
                <small className="text-muted">Admin</small>
                {
                  (e.marked)?<small style={{cursor:"pointer"}} className="text-muted float-right mt-1"
                    onClick={()=>{
                      APICaller.markNoti(e.id,0)
                      .then(res=>{
                        if(res.success){
                          this.props.loadNoti();
                        }
                      })  
                    }}
                  >Unread</small>:
                  <small style={{cursor:"pointer"}} className="text-muted float-right mt-1" onClick={()=>{
                    APICaller.markNoti(e.id,1)
                      .then(res=>{
                        if(res.success){
                          this.props.loadNoti();
                        }
                      })
                  }}>Mark as read</small>
                }
              </div>
              <div className="text-truncate font-weight-bold">{dateTime.format(new Date(e.createdAt))}</div>
              <small style={{color:(!!e.marked)?"#73818f":"blue"}}>{message_content}</small>
            </div>
            <hr />
        </div>
      )
    })
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <Nav tabs>
          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '2' })}
                     onClick={() => {
                       this.props.loadNoti()
                     }}>
              <i className="icon-bell"></i><Badge pill color="danger">{this.props.notis.length}</Badge>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="2" className="p-3">
            {this._renderNotis()}
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

export default DefaultAside;
