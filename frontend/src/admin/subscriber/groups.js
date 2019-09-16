import React, { Component } from 'react'
import Group from './group'
import { loader } from '../../spinner'
import faxios from '../../axios'

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

    new_group = (e) => {
        e.preventDefault()
        if (!this.state.new_group_name) { return }

        this.props.set_loading(true)
        faxios().post(`api/group/`, {
            name: this.state.new_group_name
        })
            .then(d => {
                console.log(d.data)
                this.setState({ new_group_name: '' })
            })
            .catch(e => console.error(e))
            .finally(msg => this.props.get_subs())
    }

    render() {

        let groups = Object.keys(this.props.groups)
            .map(x => ({
                name: x,
                ...this.props.groups[x]
            }))
            .map((group, i) =>
                <div className={`d-flex tab align-items-center 
                ${group.id === this.props.selected_group_id ?
                        'active-tab' : ''}
                    `
                } key={i + 2}>
                    <div className='group-name px-2 flex-grow-1'
                        onClick={(e) => {
                            this.props.set_loading(true)
                            this.props.get_subs(group.id, 1)
                        }}
                    >{group.name}</div>
                    <div className="ml-2 badge badge-pill badge-secondary ">
                        {this.props.state==='normal'? group.total_subs: group.result}
                    </div>
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
                        onClick={(e) => this.new_group(e)}
                        className="btn nbtn green">
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
            </form>

        let group = <Group />


        return (
            <div className='subscribers ' >
                <div className="subs row">
                    <div className="col-md-9 order-md-1 order-2">
                        {group}
                    </div>
                    <div className="col-md-3 order-md-2 order-1 groups-container">
                        <div className='groups-list'>
                            <div className='text-muted p-3 font-weight-bold'>
                                Total groups: {this.props.groups.length}
                            </div>
                            {new_group}
                            {this.props.loading ? loader : groups}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}



const mapStateToProps = (state) => state.subscribers

export default connect(mapStateToProps, actions)(Groups)