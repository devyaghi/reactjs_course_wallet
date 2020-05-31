import React from "react";
import axios_o from 'axios'

export default class TableData extends React.Component{

    constructor(props) {
        super(props);
        let UserData=JSON.parse(localStorage.getItem("data"));
        this.state={UserData:UserData,items:[]}

    }


    componentDidMount() {
        const h={
            'Accept':'application/json',
            'Authorization':'Bearer '+this.state.UserData.token

        }
        axios_o.post("/get_my_data",{},{headers:h}).then(respoonse=>{
           console.log(respoonse.data.data);
           this.setState({items:respoonse.data.data});
        })

    }

Edit=(id)=>{

        window.location="/Edit/"+id;

}


    delete=(id)=>{
       // console.log(id);

        const h={
            'Accept':'application/json',
            'Authorization':'Bearer '+this.state.UserData.token

        }

        axios_o.post("/deleteitem",{id:id},{headers:h}).then(response=>{
          // console.log(response.data);
          let new_array=this.state.items.filter(p=>p.id!==id);
          this.setState({items:new_array});

        });

    }

    render() {
        //console.log(this.state.UserData.token)
        return(
         <table className="table table-striped">
            <thead>
              <tr>
                  <th>id</th>
                  <th>item</th>
                  <th>type</th>
                  <th>cost</th>
                  <th>operation</th>
              </tr>
            </thead>
            <tbody>

            {this.state.items.map((item)=>(
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.item}</td>
                <td>{item.type}</td>
                <td>{item.cost}</td>
                <td>
                    <button className='btn btn-danger' onClick={()=>this.delete(item.id)}>Delete</button>
                    <button className='btn btn-danger' onClick={()=>this.Edit(item.id)}>Edit</button>
                </td>
            </tr>
            ))}

            </tbody>

        </table>)
    }

}