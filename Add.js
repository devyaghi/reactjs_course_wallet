import React from "react";
import {Formik, Field, ErrorMessage, setIn} from "formik";
import * as Yup from 'yup'
import reg_style from '../css/registeration.module.css';
import axios_o from 'axios'
import Menu from "./Menu";

export default class Add extends React.Component{
    constructor(props) {
        super(props);

        let UserData=JSON.parse(localStorage.getItem("data"));


        this.state={show_loader:false,success_alert:false,fail_alert:false , message_when_error:'',
            UserData:UserData}
    }





    add=(values)=>{
        this.setState({show_loader:true,success_alert:false,fail_alert:false});

           const h={
               'Accept':'application/json',
               'Authorization':'Bearer '+this.state.UserData.token

           }

        //console.log(values);
        axios_o.post("/additem",{
            item:values['item']
            ,
            cost:values['cost']
            ,
            type:values['type']
        },{
            headers:h
        }).then(response=>{
            //console.log(response.data.status);

            if (response.data.status===false){
                this.setState({fail_alert:true});
                //console.log(response.data.errors);
                let errors=response.data.errors;
                let message_error='';
                Object.keys(errors).forEach(function(key){
                    message_error=message_error+(key+" : "+errors[key])+" , ";
                });
                // console.log(message_error);
                this.setState({message_when_error:message_error});


            }
            else if (response.data.status===true){
                this.setState({success_alert:true});
               setInterval(function () {
                    window.location="/Dash";
                },5000);

            }


            this.setState({show_loader:false});
        });

    }

    form_code=(props)=>{
        return(
            <div className={'row'}>
                <div className={'col-sm-2'}></div>
                <div className={'col-sm-8'}>

                    <form onSubmit={props.handleSubmit} className={reg_style.reg_form}>

                        {this.state.fail_alert &&
                        <div className="form-group">
                            <div className="alert alert-danger">Error in add : {this.state.message_when_error} </div>
                        </div>
                        }

                        {this.state.success_alert &&
                        <div className="form-group">
                            <div className="alert alert-success">Add successfully done : you will be redirected to login within 5 seconds click here if not redirect until now <a href={'/Dash'}>Dash</a></div>
                        </div>
                        }

                        <div className="form-group">
                            <label>Item</label>
                            <Field name={'item'}  className="form-control" />
                            <ErrorMessage name={'item'} component={'div'} className={reg_style.error_messages} />
                        </div>

                        <div className="form-group">
                            <label>cost</label>
                            <Field name={'cost'} className="form-control"/>
                            <ErrorMessage name={'cost'} component={'div'} className={reg_style.error_messages} />
                        </div>

                        <div className="form-group">
                            <label>Type</label>
                            <Field name={'type'} className="form-control" component="select" >
                                <option value={'in'}>IN</option>
                                <option value={'out'}>OUT</option>

                            </Field>
                            <ErrorMessage name={'type'} component={'div'} className={reg_style.error_messages}/>
                        </div>




                        <button type={'submit'} className="btn btn-outline-success">

                            {this.state.show_loader &&
                            <span className="spinner-grow spinner-grow-sm" aria-hidden={true}
                                  role={'status'}></span>
                            }
                            Add item
                        </button>
                    </form>

                </div>
                <div className={'col-sm-2'}></div>
            </div>

        )
    }

    validation_schema=()=>{
        const schema=Yup.object().shape({
            item:Yup.string().required('item is mandotary'),
            cost:Yup.string().required('cost is mandotary'),
            type:Yup.string().required('type is mandotary'),


        });
        return schema;
    }


    render() {
        return(
            <>
            <Menu/>
            <Formik initialValues={{item:'',cost:'',type:'in'}}
                    onSubmit={this.add} render={this.form_code}
                    validationSchema={this.validation_schema}
            />
            </>
        )
    }

}