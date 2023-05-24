"use client"

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import TreeView from '@mui/lab/TreeView';
import Label from '@mui/icons-material/Label';
import { styled } from '@mui/material/styles';
import MailIcon from '@mui/icons-material/Mail';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '&.Mui-expanded': {
            fontWeight: theme.typography.fontWeightRegular,
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: 'var(--tree-view-color)',
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: 'inherit',
            color: 'inherit',
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 0,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2),
        },
    },
}));

function StyledTreeItem(props) {
    const {
        bgColor,    
        color,
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        ...other
    } = props;

    return (
        <StyledTreeItemRoot
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </Box>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            {...other}
        />
    );
}

StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
};

export default function TreeMenu() {
    const menu = [
        {
            name: 'Home',
            icon: MailIcon,
            path: ''
        },
        {
            name: 'Contact',
            icon: DeleteIcon,
            path: 'contact'
        },
        {
            name: 'News',
            icon: DeleteIcon,
            path: 'news'
        },
        {
            name: 'Categories',
            icon: Label,
            path: 'categories',
            child: [
                {
                    name: 'Social',
                    icon: SupervisorAccountIcon,
                    path: 'social',
                },
                {
                    name: 'Updates',
                    icon: InfoIcon,
                    path: 'updates'
                },
                {
                    name: 'Forums',
                    icon: ForumIcon,
                    path: 'forums'
                },
                {
                    name: 'Promotions',
                    icon: LocalOfferIcon,
                    path: 'promotions'
                },
            ]
        },
        {
             name: 'History',
             icon: Label,
             path: 'history',
         },
    ];

    return (
        <TreeView
            defaultExpanded={[4]}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
            sx={{ maxHeight: 2640, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
            {
                menu.map((val, i) => {
                    if(val?.child?.length > 0)
                        return (
                            <StyledTreeItem nodeId={i+1} labelText={val.name} labelIcon={Label}>
                                {
                                    val.child.map((child, ii) => {
                                        return (
                                            <Link href={`/${child.path}`} underline="none">
                                                <StyledTreeItem
                                                    nodeId={i+ii+2}
                                                    labelText={child.name}
                                                    labelIcon={child.icon}
                                                />
                                            </Link>
                                        )
                                    })
                                }
                            </StyledTreeItem>
                        )
                    return (
                        <Link href={`/${val.path}`} underline="none">
                            <StyledTreeItem nodeId={i+1} labelText={val.name} labelIcon={val.icon} />
                        </Link>
                    )
                })
            }
        </TreeView>
    );
}