import React, { Component } from 'react'
import Group from './group'
import faxios from '../../axios';
import Spinner from '../../spinner'


// redux
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from './actions'


class Groups extends Component {
    static propTypes = {
        groups: PropTypes.object.isRequired,
        get_subs: PropTypes.func.isRequired,
    }

    state = {
        new_group_name: '',
    }

    componentDidMount = () => {
        this.props.get_subs()
    }


    render() {
        if(this.props.loading){
            return <Spinner />
        }

        let groups = Object.keys(this.props.groups)
            .map(x => ({
                name:x,
                ...this.props.groups[x]
            }))
            .map((group, i) =>
                <div className={`d-flex tab align-items-center 
                ${group.id === this.props.selected_group_id ?
                        'active-tab' : ''}
            `
                } key={i + 2}>
                    <div className='group-name px-2 flex-grow-1'
                        onClick={(e) => this.props.get_subs(group.id)}
                    >{group.name}</div>
                    <div className="ml-2 badge badge-pill badge-secondary ">{group.total_subs}</div>
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
                        <Group/>
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