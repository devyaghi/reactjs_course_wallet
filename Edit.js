import React from "react";
import Menu from "./Menu";
import {ErrorMessage, Field, Formik, useFormik} from "formik";
import reg_style from "../css/registeration.module.css";
import axios_o from 'axios';
import * as Yup from 'yup'
export default class Edit extends React.Component{

    constructor(props) {
        super(props);
        let UserData=JSON.parse(localStorage.getItem("data"));
        this.state={UserData:UserData,item:'',
            cost:'',
            type:'',
            is_loading_data:false,
            show_loader:false
        }
    }

    componentDidMount() {


        const h={
            'Accept':'application/json',
            'Authorization':'Bearer '+this.state.UserData.token

        }

        axios_o.post("/edititem",{"id":this.props.match.params.id}
        ,{
            headers:h
            }
        ).then(response=>{
            console.log(response.data.data);
            this.setState({item:response.data.data.data.item,
                cost:response.data.data.data.cost,
                type:response.data.data.data.type,
                is_loading_data:true})
        });

    }

    validation_schema=()=>{
        const schema=Yup.object().shape({
             item:Yup.string().required('please insert item name'),
             cost:Yup.string().required('please insert item cost'),
             type:Yup.string().required('please insert item type')


        });
        return schema;


    }


    FormCode=()=>{


        const h={
            'Accept':'application/json',
            'Authorization':'Bearer '+this.state.UserData.token

        }

       const formik=useFormik({
           validationSchema:this.validation_schema,
           initialValues:{item:this.state.item, cost:this.state.cost,type:this.state.type},
           onSubmit:values=>{
             //console.log(values['item']);
               this.setState({show_loader:true});
               axios_o.post("/updateitem",{
                   "id":this.props.match.params.id,
                   "item":values['item'],
                   "cost":values['cost'],
                   "type":values['type']
               },{
                   headers:h
               }).then(response=>{
                   console.log(response);
                   this.setState({show_loader:false});
               })


           }
       });

       return (
           <form onSubmit={formik.handleSubmit}>

               <div className="form-group">
                   <label>Item</label>
                   <input
                   id={'item'}
                   name={'item'}
                   type={'text'}
                   onChange={formik.handleChange}
                   value={formik.values.item}
                   className="form-control"
                   />

                   {formik.errors.item && formik.touched.item ?(
                       <div>{formik.errors.item}</div>
                   ):null}


               </div>

               <div className="form-group">
                   <label>cost</label>
                   <input
                       id={'cost'}
                       name={'cost'}
                       type={'text'}
                       onChange={formik.handleChange}
                       value={formik.values.cost}
                       className="form-control"
                   />

                   {formik.errors.cost && formik.touched.cost ?(
                       <div>{formik.errors.cost}</div>
                   ):null}

               </div>

               <div className="form-group">
                   <label>Type</label>

                   <select id={'type'}
                           name={'type'}
                           className="form-control"
                           onChange={formik.handleChange}
                           value={formik.values.type}
                   >
                       <option value={'in'}>IN</option>
                       <option value={'out'}>OUT</option>
                   </select>

                   {formik.errors.type && formik.touched.type ?(
                       <div>{formik.errors.type}</div>
                   ):null}

               </div>




               <button type={'submit'} className="btn btn-outline-success">


                   {this.state.show_loader &&
                   <span className="spinner-grow spinner-grow-sm" aria-hidden={true}
                         role={'status'}></span>
                   }

                   Update item
               </button>

           </form>
       )




    }


    render() {
        return(
            <>
            <Menu/>
                {this.state.is_loading_data &&
                <Formik children={this.FormCode}/>
                }
            </>
        )
    }

}