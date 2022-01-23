import { connect } from "react-redux";
import AllDivPlayer from "../../components/allDivPlayer";

const mapStateToProps = (state:any) => ({
    monsterName: state.monsterName, 
    gamerName : state.gamerName,
})
export default connect(mapStateToProps)(AllDivPlayer)