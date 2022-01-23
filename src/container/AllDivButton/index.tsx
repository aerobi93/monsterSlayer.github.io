import { connect } from "react-redux";
import AllDivButton from "../../components/allDivButton";

const mapStateToProps= (state:any) => ({
     beeingPlaying: state.beeingPlaying
})

export default connect(mapStateToProps)(AllDivButton)