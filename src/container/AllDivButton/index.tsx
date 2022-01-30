import { connect } from "react-redux";
import AllDivButton from "../../components/allDivButton";

const mapStateToProps= (state:any) => ({
     beeingPlaying: state.beeingPlaying,
     level : state.level,
     levelUp: state.lvUpPlayer,
})

export default connect(mapStateToProps)(AllDivButton)