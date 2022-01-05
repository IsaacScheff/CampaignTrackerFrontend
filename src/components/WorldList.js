import React from "react";
import { connect } from "react-redux";
import { fetchWorlds } from "../redux/worlds";
import { Link } from "react-router-dom";


export class WorldList extends React.Component {
  render() {
    return (
      <div>
        <p>Worlds:</p>
        {this.props.worlds.map(world => (
          <div key={world.id}>
            <Link to ={`/worlds/${world.slug}`}>
              <p>{world.Name}</p>
              {/* <img src={world.imageUrl} /> */}
            </Link>
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
