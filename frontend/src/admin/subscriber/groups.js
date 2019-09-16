import React, { Component } from 'react'
import Group from './group'
import faxios from '../../axios';


// redux
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from './actions'


class Groups extends Component {
    static propTypes = {
        groups: PropTypes.array.isRequired,
    }

    state = {
        new_group_name: '',
    }

    componentDidMount = () => {
        // this.get_groups()
    }


    render() {
        let groups = this.props.groups.map((group, i) =>
            <div className={`d-flex tab align-items-center 
                ${group.id === this.state.selected_group_id ?
                    'active-tab' : ''}
            `
            } key={i + 2}>
                <div className='group-name px-2 flex-grow-1'
                    onClick={(e) => this.show_group(e, group)}
                >{group.name}</div>
                <div className="ml-2 badge badge-pill badge-secondary ">{group.subs}</div>
            </div>
        )

        let new_group =
            <form className={'d-flex tab align-items-center new-group'} key={1}>
                <div className='flex-grow-1 pl-2'>
                    <input
                        onChange={e => this.setState({
                            new_group_name: e.target.value
                        })}
                        value={this.state.new_group_name}
                        type="text"
                        className="new_group_name tab_input"
                        placeholder="create group" />
                </div>
                <div className='create-group create px-1'>
                    <button
                        onClick={this.new_group}
                        className="btn nbtn green">
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
            </form>

        return (
            <div className='subscribers '>
                <div className="subs row">
                    <div className="col-md-9 order-md-1 order-2">
                        {
                            this.state.selected_group_id ?
                                <Group
                                    set_groups_state={this.set_groups_state}
                                    update_groups={this.get_groups}
                                    selected_group_name={this.state.selected_group_name}
                                    selected_group_id={this.state.selected_group_id} /> :
                                ''
                        }
                    </div>
                    <div className="col-md-3 order-md-2 order-1 groups-container">
                        <div className='groups-list'>
                            <div className='text-muted p-3 font-weight-bold'>
                                Total groups: {this.props.groups.length}
                            </div>
                            {new_group}
                            {groups}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}



const mapStateToProps = (state) => state.subscribers

export default connect(mapStateToProps, actions)(Groups)