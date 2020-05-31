import React from "react";
import {Formik, Field, ErrorMessage, setIn} from "formik";
import * as Yup from 'yup'
import reg_style from '../css/registeration.module.css';
import axios_o from 'axios'

export default class Registeration extends React.Component{
    constructor(props) {
        super(props);
        this.state={show_loader:false,success_alert:false,fail_alert:false , message_when_error:''}
    }

    register=(values)=>{
        this.setState({show_loader:true,success_alert:false,fail_alert:false});

        //console.log(values);
        axios_o.post("/appRegister",{
            name:values['name']
            ,
            email:values['email']
            ,
            password:values['password']
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
               window.location="/";
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
                               <div className="alert alert-danger">Error in Registeration : {this.state.message_when_error} </div>
                           </div>
                           }

                           {this.state.success_alert &&
                           <div className="form-group">
                               <div className="alert alert-success">Registeration successfully done : you will be redirected to login within 5 seconds click here if not redirect until now <a href={'/'}>Login</a></div>
                           </div>
                           }

                           <div className="form-group">
                               <label>Name</label>
                               <Field name={'name'}  className="form-control" />
                               <ErrorMessage name={'name'} component={'div'} className={reg_style.error_messages} />
                           </div>

                           <div className="form-group">
                               <label>Email</label>
                               <Field name={'email'} className="form-control"/>
                               <ErrorMessage name={'email'} component={'div'} className={reg_style.error_messages} />
                           </div>

                           <div className="form-group">
                               <label>Password</label>
                               <Field name={'password'} className="form-control" type={'password'}/>
                               <ErrorMessage name={'password'} component={'div'} className={reg_style.error_messages}/>
                           </div>


                           <div className="form-group">
                               <label>Re Password</label>
                               <Field name={'repassword'} className="form-control" type={'password'}/>
                               <ErrorMessage name={'repassword'} component={'div'} className={reg_style.error_messages} />
                           </div>


                           <button type={'submit'} className="btn btn-outline-success">

                               {this.state.show_loader &&
                               <span className="spinner-grow spinner-grow-sm" aria-hidden={true}
                                     role={'status'}></span>
                               }
                               Register
                           </button>
                       </form>

                   </div>
                   <div className={'col-sm-2'}></div>
               </div>

              )
    }

    validation_schema=()=>{
        const schema=Yup.object().shape({
            name:Yup.string().required('Name is mandotary'),
            email:Yup.string().required('Email is mandotary').email('invalid email format'),
            password:Yup.string().min(8,'Password must be at least 8').required('Password is mandotary'),
            repassword:Yup.string()
                .oneOf([Yup.ref('password'),null],'Not Match in password').
                min(8,'Password must be at least 8').required('Re Password is mandotary'),

        });
        return schema;
    }


    render() {
        return(
            <Formik initialValues={{name:'',email:'',password:'',repassword:''}}
                    onSubmit={this.register} render={this.form_code}
                    validationSchema={this.validation_schema}
            />
        )
    }

}