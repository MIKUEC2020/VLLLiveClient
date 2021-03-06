import {
    AppBar,
    Divider,
    Drawer, IconButton,
    List,
    Toolbar,
    Typography,
    WithStyles
} from "@material-ui/core";
import React from "react";
import AppListItem from "../../resouces/AppListItem"
import {Home, Info, AccountCircle, YouTube} from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../../../styles/mainStyle";
import {ILoginState} from "../../../reducers/ILoginState";
import {AuthDispatchProps} from "../../../containers/VerifyContainer";
import {ClientConfig} from "../../../utils/config";

interface StyleProps extends WithStyles<typeof styles> {
}

interface State {
    toggle: {
        w_side: string,
        isOpen: boolean,
    }
}

type Props = StyleProps & ILoginState & AuthDispatchProps

class Bar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.props.verifyLogin()
        //this.props.getUserCount()
    }

    state = {
        toggle: {
            w_side: "left",
            isOpen: false
        },
    }

    toggleDrawer(side: string, open: boolean) {
        this.setState({
            toggle: {
                w_side: side,
                isOpen: open
            }
        });
    };

    render() {
        const {classes} = this.props;
        let sideList;
        if (!this.props.isLogin) {
            sideList = (
                <div>
                    <List className={classes.nav}>
                        <AppListItem name={"トップページ"} link={"/"} Icon={Home}/>
                        <Divider/>
                        <AppListItem name={"参加方法"} link={"/about"} Icon={MenuIcon}/>
                        <a href={ClientConfig.youtubeLive}>
                            <AppListItem name={"Youtube Live"} Icon={YouTube}/>
                        </a>
                    </List>
                </div>
            )
        } else {
            sideList = (
                <div>
                    <List className={classes.nav}>
                        <AppListItem name={"トップページ"} link={"/"} Icon={Home}/>
                        <Divider/>
                        <AppListItem name={"参加方法"} link={"/about"} Icon={MenuIcon}/>
                        <AppListItem name={"ユーザ情報"} link={"/account"} Icon={AccountCircle}/>
                        <a href={ClientConfig.youtubeLive}>
                            <AppListItem name={"Youtube Live"} Icon={Info}/>
                        </a>
                        <Divider/>
                        <a href={ClientConfig.root + "/logout"}>
                            <AppListItem name={"ログアウト"} link={"/logout"} Icon={Info}/>
                        </a>

                    </List>
                </div>
            )
        }
        return (
            <header>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color={"inherit"} aria-label="Menu"
                                    onClick={() => this.toggleDrawer('left', true)}>
                            <MenuIcon style={{color: "white"}}/>
                        </IconButton>

                        <Drawer className={classes.drawer} open={this.state.toggle.isOpen}
                                onClose={() => {
                                    this.toggleDrawer('left', false)
                                }}>
                            <div

                                tabIndex={0}
                                role="button"
                                onClick={() => {
                                    this.toggleDrawer('left', false)
                                }}
                                onKeyDown={() => this.toggleDrawer('left', false)}
                            >
                                {sideList}
                            </div>
                        </Drawer>
                        <Typography className={classes.barhead} variant="h6">
                            {/*VLL*/}
                        </Typography>
                        <Divider/>
                        {/*<div className={"simple-menu"}>サインイン</div>*/}
                    </Toolbar>
                </AppBar>
            </header>
        );
    }
}

export default withStyles(styles, {withTheme: true})(Bar);
