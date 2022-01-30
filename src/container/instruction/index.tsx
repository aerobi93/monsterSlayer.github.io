import { connect } from "react-redux";
import Instruction from "../../components/instruction";

const mapStateToProps = (state : any) => ({
    level: state.lvUpPlayer /100
})

export default connect(mapStateToProps)(Instruction)