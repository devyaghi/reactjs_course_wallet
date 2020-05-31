import React from "react";
import Menu from "./Menu";
import TableData from "./TableData";


export default class Dash extends React.Component{
    constructor(props) {
        super(props);
    }


    render() {
       //  let x=JSON.parse(localStorage.getItem("data"));
       // console.log(x);
        return(
            <>
            <Menu/>
            <TableData/>
            </>
            )
    }

}


