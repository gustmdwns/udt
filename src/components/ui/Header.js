import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles }  from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import logo from '../../assets/logo.svg';

function ElevationScroll( props ){
    const { children } = props;
    
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });
  
    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles(theme => ({
    ToolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "3em",
        [theme.breakpoints.down("md")]: {
            marginBottom: "2em"
        },
        [theme.breakpoints.down("xs")]: {
            marginBottom: "1.25em"
        }
    },
    logo: {
        height: "8em",
        [theme.breakpoints.down("md")]: {
            height: "7em"
        },
        [theme.breakpoints.down("xs")]: {
            height: "5.5em"
        }
    },
    logoContainer: {
        padding: 0,
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    tabContainer: {
        marginLeft: "auto"
    },
    tab: {
        ...theme.typography.tab,
        minWidth: "10",
        marginLeft: "25px"
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: "50px",
        marginLeft: "50px",
        marginRight: "25px",
        height: "45px",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    },
    menu: {
        backgroundColor: theme.palette.common.blue,
        color: "white",
        borderRadius: 0
    },
    menuItem: {
        ...theme.typography.tab,
        opacity: 0.7,
        "&:hover": {
            opacity: 1
        }
    },
    drawerIcon: {
        height: "50px",
        width: "50px"
    },
    drawerIconContainer: {
        marginLeft: "auto",
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    drawer: {
        backgroundColor: theme.palette.common.blue
    },
    drawerItem: {
        ...theme.typography.tab,
        color: "white",
        opacity: 0.7
    },
    drawerItemEstimate: {
        backgroundColor: theme.palette.common.orange
    },
    drawerItemSelected: {
        "& .MuiListItemText-root": {
            opacity: 1
        }
    },
    appbar: {
        zIndex: theme.zIndex.modal + 1
    }
}))

export default function Header( props ){
    /* Header css */
    const classes = useStyles();
    const theme = useTheme();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    
    /* Drawer 메뉴 */
    const [openDrawer, setOpenDrawer] = useState(false);
    /* 2Depth 메뉴  */
    const [anchorEl, setAnchorEl] = useState(null);
    /* 2Depth 메뉴 상태 */
    const [openMenu, setOpenMenu] = useState(false);
    
    

    /* 1Depth 메뉴 active */
    const handleChange = (e, newValue) => {
        props.setValue(newValue);
    }
    /* 2Depth 메뉴 show */
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
        setOpenMenu(true)
    }
    /* 2Depth 메뉴 hide */
    const handleClose = (e) => {
        setAnchorEl(null)
        setOpenMenu(false)
    }
    /* 2Depth 메뉴 Handler */
    const handleMenuItemClick = (e, i) => {
        setAnchorEl(null);
        setOpenMenu(false);
        props.setSelectedIndex(i)
    }
    /* 2Depth 메뉴 List */
    const menuOptions = [
        {name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0}, 
        {
            name: "Custom Software Development", 
            link: "/customsoftware", 
            activeIndex: 1, 
            selectedIndex: 1
        },
        {
            name: "iOS/Android App Development", 
            link: "/miblieapps", 
            activeIndex: 1, 
            selectedIndex: 2
        },
    ]

    const routes = [
        {name: "Home", link: "/", activeIndex: 0},
        {
            name: "Services", 
            link: "/services", 
            activeIndex: 1, 
            ariaOwns: anchorEl ? "simple-mene" : undefined, 
            ariaPopup: anchorEl ? "true" : undefined, 
            mouseOver: event => handleClick(event)
        },
        {name: "Revolution", link: "/revolution", activeIndex: 2},
        {name: "About Us", link: "/about", activeIndex: 3},
        {name: "Contact Us", link: "/contact", activeIndex: 4},
    ]

    /* 메뉴 active */
    useEffect(() => {
        [...menuOptions, ...routes].forEach(route => {
            switch( window.location.pathname ){
                case `${route.link}`:
                    if( props.value !== route.activeIndex ){
                        props.setValue(route.activeIndex)
                        if( route.selectedIndex && route.selectedIndex !== props.selectedIndex ){
                            props.setSelectedIndex(route.selectedIndex)
                        }
                    }
                    break;
                case '/estimate':
                    props.setValue(5)
                    break;
                default:
                    break;
            }
        })
    }, [props.value, menuOptions, props.selectedIndex, routes, props]);
    
    /* Tab 메뉴 */
    const tabs = (
        <React.Fragment>
            <Tabs 
                value={props.value} 
                onChange={handleChange} 
                className={classes.tabContainer}
                indicatorColor="primary"
            >
                {routes.map((route, index) => (
                    <Tab 
                        key={`${route}${index}`}
                        className={classes.tab} 
                        component={Link} 
                        to={route.link} 
                        label={route.name} 
                        aria-owns={route.ariaOwns}
                        aria-haspopup={route.ariaPopup}
                        onMouseOver={route.mouseOver}
                    />
                ))}
            </Tabs>
            <Button 
                component={Link} to="/estimate" 
                variant="contained" color="secondary" 
                className={classes.button}
                onClick={() => props.setValue(5)}
            >
                Free Estimate
            </Button>
            
            <Menu 
                id="simple-menu" 
                anchorEl={anchorEl} 
                open={openMenu} 
                onClose={handleClose}
                classes={{ paper: classes.menu }}
                MenuListProps={{ onMouseLeave: handleClose }}
                elevation={0}
                style={{zIndex: 1302}}
                keepMounted
            >
                {menuOptions.map((option, i) => (
                    <MenuItem 
                        key={`${option}${i}`}
                        component={Link}
                        to={option.link}
                        classes={{ root: classes.menuItem }}
                        onClick={(event) => {handleMenuItemClick(event, i); props.setValue(1); handleClose()}}
                        selected={i === props.selectedIndex && props.value === 1}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    )
    
    /* Drawer 메뉴 */
    const drawer = (
        <React.Fragment>
            <SwipeableDrawer 
                disableBackdropTransition={!iOS} 
                disableDiscovery={iOS} 
                open={openDrawer} 
                onClose={() => setOpenDrawer(false)}
                onOpen={() => setOpenDrawer(true)}
                classes={{paper: classes.drawer}}
            >
                <div className={classes.ToolbarMargin} />
                <List disablePadding>
                    {routes.map((route, index) => (
                        <ListItem 
                        key={`${route}${route.activeIndex}`}    
                        divider button 
                            component={Link} 
                            to={route.link} 
                            selected={props.value === route.activeIndex}
                            classes={{selected: classes.drawerItemSelected}}
                            onClick={() => {setOpenDrawer(false); props.setValue(route.activeIndex)}}
                        >
                            <ListItemText 
                                className={classes.drawerItem}
                                disableTypography
                            >
                                {route.name}
                            </ListItemText>
                        </ListItem>
                    ))}
                    
                    <ListItem 
                        className={classes.drawerItemEstimate} 
                        onClick={() => {setOpenDrawer(false); props.setValue(5)}} 
                        divider button 
                        component={Link} to="/estimate"
                        classes={{ root: classes.drawerItemEstimate, selected: classes.drawerItemSelected }}
                        selected={props.value === 5}    
                    >
                        <ListItemText 
                            className={classes.drawerItem} 
                            disableTypography
                        >
                            Free Estimate
                        </ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
            <IconButton className={classes.drawerIconContainer} onClick={() => setOpenDrawer(!openDrawer)} disableRipple>
                <MenuIcon className={classes.drawerIcon} />
            </IconButton>
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position="fixed" className={classes.appbar}>
                    <Toolbar disableGutters>
                        <Button 
                            className={classes.logoContainer} 
                            component={Link} 
                            to="/" 
                            disableRipple
                            onClick={() => props.setValue(0)}
                        >
                            <img alt="company logo" className={classes.logo} src={logo} /> 
                        </Button>
                        {matches ? drawer : tabs}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.ToolbarMargin} />
        </React.Fragment>
    )
}