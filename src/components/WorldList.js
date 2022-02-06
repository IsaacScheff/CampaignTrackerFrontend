import React from "react";
import { connect } from "react-redux";
import { fetchWorlds } from "../redux/worlds";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import WorldForm from "./WorldForm";
import WorldSearchForm from "./WorldSearchForm";


export class WorldList extends React.Component {

  render() {
    return (
      <div>
        <p className="world-list-header">Campaign List</p>
        <WorldSearchForm />
        {this.props.worlds.map(world => (
          <div key={world.id} className="world-list">
            <Link to ={`/worlds/${world.id}`}>
              <p className='campaign-title'>{world.name}</p>
              <img className="campaign-image" alt={world.description} src={world.imageUrl} />
            </Link>
            <p className='world-description'>
                {world.description}
            </p>
          </div>
        ))}
      </div>
    )
  }
  componentDidMount() {
    try {
      this.props.getWorlds();
    } catch (error) {
      console.log(error);
    }
  }
}

const mapState = (state) => {
  return{
    worlds: state.worlds
  }
};

const mapDispatch = (dispatch) => {
  return{
    getWorlds: () => dispatch(fetchWorlds()),
  }
};

export default connect(mapState, mapDispatch)(WorldList);
