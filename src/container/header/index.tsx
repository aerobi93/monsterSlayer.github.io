import { connect } from "react-redux";
import Header from  '../../components/header'

const mapStateToProps = (state: any) => ({
level : state.level
})

export default connect(mapStateToProps)(Header)