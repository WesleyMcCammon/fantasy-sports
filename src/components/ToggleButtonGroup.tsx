import React, { useState, useEffect } from 'react';
import * as Material from '@material-ui/core';

function ToggleButtonGroup(props: any) {
    const useStyles = Material.makeStyles(theme => ({ 
        selectedButton: {
            backgroundColor: '#cdcdcd',
        },
        unSelectedButton: {
            backgroundColor: 'transparent'
        }
    }));

    const classes = useStyles();
    const [selectedButtons, setSelectedButtons] = useState([] as number[]);

    function onButtonClick(id: number) {

        const copySelectedButtons = [...selectedButtons];
        const buttonIndex = copySelectedButtons.indexOf(id);
        if(buttonIndex < 0) {
            copySelectedButtons.push(id);
        }
        else {
            copySelectedButtons.splice(buttonIndex, 1);
        }

        setSelectedButtons(copySelectedButtons);
        props.toggleButtonClick(id);
    }

    return (
    <div>
        {props.includeAll && <Material.Button 
            variant={props.variant}
            key={-1} 
            className={selectedButtons.indexOf(0) >= 0 ? classes.selectedButton : classes.unSelectedButton}
            onClick={() => { onButtonClick(0)}}>ALL</Material.Button>}
        {props.buttons.map((b:any) => 
            <Material.Button 
                variant={props.variant}
                className={selectedButtons.indexOf(b.id) >= 0 ? classes.selectedButton : classes.unSelectedButton} 
                key={b[props.idProperty]}
                onClick={() => {onButtonClick(b[props.idProperty])}}>{b[props.textProperty]}
            </Material.Button>
            )}
    </div>)
}

export default ToggleButtonGroup;