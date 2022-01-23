import { connect } from "react-redux";
import App from "../../components/App";
import { changeLevel, begin, end} from '../../action'

const mapStateToProps = (state:any) => ({
    beeingPlaying : state.beeingPlaying, 
    monsterPv : state.monsterPv,
    playePv : state.playerPv,
    level : state.level,
})

const mapDispatchtoProps = (dispatch:any) => ({
    begin: () => {
        dispatch(begin())
    },
    end: () => {
        dispatch(end())
    },
   changeLevel: () => {
       dispatch(changeLevel())
   }
})
export default connect(mapStateToProps, mapDispatchtoProps)(App)