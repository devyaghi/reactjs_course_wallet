import React from "react";
import menu_style from '../css/menu.module.css';
export default class Menu extends React.Component{

    constructor(props) {
        super(props);
        let UserData=JSON.parse(localStorage.getItem("data"));
        this.state={UserData:UserData}
    }




    render() {


        console.log(this.state.UserData);

        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
               <a className="navbar-brand" href={'/Dash'}>Dash</a>

                <div className="collapse navbar-collapse" id="navb">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                           <a href={'/add'} className="nav-link">Add Item</a>
                        </li>

                    </ul>
                    <span className={menu_style.name}>
                    Welcome : {this.state.UserData.data.name}
                    </span>
                </div>
            </nav>
        )
    }


}