import { connect } from "react-redux";
import DivPlayer from "../../components/allDivPlayer/divPlayer";

const mapStateToProps = (state:any) => ({
    gamerName : state.gamerName,
    monsterPvMax: state.currentMonster.pvMax,
    monsterPv: state.monsterPv, 
    playerPvMax: state.playerPvMax,
    playerPv : state.playerPv,
    monsterManaMax: state.currentMonster.manaMax,
    monsterMana: state.monsterMana, 
    playerManaMax: state. playerManaMax,
    playerMana: state.playerMana,
    messageMonster: state.messageMonster,
    messagePlayer: state.messagePlayer,
})

export default connect(mapStateToProps)(DivPlayer)