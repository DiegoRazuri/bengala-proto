import React from 'react'
import ReactDom from 'react-dom'
import CallBoxTable from './components/callBoxTable'
import CallApp from './components/callApp'
import GeneralAdmPanel from './components/generalAdmPanel'
import CreateEnterpriseForm from './components/createEnterpriseForm'
import SellApp from './components/sellApp'
import QuotationForm from './components/quotationForm'
import CallDetailView from './components/callDetailView'
import SearchBox from './components/searchBox'
import BengalaApp from './components/bengalaApp'
import Layout from './components/layout'
import EnterpriseprofileApp from './components/enterpriseprofileApp'
import { Router, Route, Link, browserHistory } from 'react-router'
import Page from 'page'

/*
    <UserAvatar userinfo = {user} />,
    document.getElementById('wrapperUserInfo')
);
*/

/*
ReactDom.render(
    <CreateEnterpriseForm/>,
    document.getElementById('wrapperCreateEnterpriseForm')
);
*/
/*
ReactDom.render(
  <BengalaApp />,
  document.getElementById('temporalWrapper')
);*/
/*
ReactDom.render(
  <Layout />,
  document.getElementById('temporalWrapper')
);
*/
/*
ReactDom.render(
  <CallDetailView />,
  document.getElementById('wrapperCallDetailView')
);
*/
/*
$(document).ready(function(){
/*
* PETICION DE DATOS AL INICIAR SESION
*/
 /*   var url_user_info = '/api/userprofile/'+user_id
    $.get(url_user_info, function(res){
        console.log(res)

    })
    console.log("inicio el dom")
*/

/*
<img src={this.state.user_info.workplaces[0].enterprise.profileImage}/>
*/

/*
* FUNCIONALIDAD SEARCHFORM
*/
/*
    $("#btnSearchForm").on("click", function(e){
        console.log("click")
        e.preventDefault()
        console.log("click")
        let word = $('#searchWord').val()
        let url_form = $("#searcherform").attr('action')
        let url_point = url_form + word
        console.log(url_point)

        $.get(url_point, function (res){
            console.log(res[1])

            for(let obj in res){
                console.log(res[obj]);
            }
            let obj = res[1]

//let counting = num => let wrapperList = document.getElementByClassName('score'); for(let i = 0; i < num; i++){ let row = document.createElement('LI'); row.className = 'icoScore'; wrapperList.appendChild(row);} return wrapperList;
    

            ReactDom.render(
              <CallApp results = {res} />,
              document.getElementById('wrapperPrincipalComponentsPlatformView')
            );

   
        });

    })
*/
/*
* FUNCIONALIDAD BTN CONVOCATORIAS PENDIENTES
*/
/*
    $("#btnPrincipalPlatformPanel").click(function (){
        let url_g = '/api/convocatorias/pendientes/'+ e_id
        
        $.get( url_g, function ( res ){
            console.log(res[1])
            
            for(let obj in res){
                console.log(res[obj]);
            }
            let obj = res[1]



            ReactDom.render(
              <CallApp />,
              document.getElementById('wrapperPrincipalComponentsPlatformView')
            );
            
        });
    })
*/

/*
    $('#formCreateNewCall').on("submit", function(e){
        
        e.preventDefault();

        $("#user_id").val(user_id)
        
        $("#enterprise_id").val(e_id)
        
        let value_f =  $("#enterprise_id").val()

        console.log("este es el valor del input hidden: "+value_f)
        let formData = new FormData(this)
        console.log(formData)

        $.ajax({
            type:'POST',
            url: $(this).attr('action'),
            data:formData,
            cache:false,
            contentType: false,
            processData: false,
            success:function(data){
                console.log("success");
                console.log(data);
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });



    });
*/
/*

    $("#formDevelopment").on('submit', function(e){
        e.preventDefault();
        //let url_r = $(this).attr('action') + $('#input_value').val()
        let url_r = $(this).attr('action')

        


        var input_value = $('#input_value').val()
        var input_value_extra = "56e70cc2539c9fe521ebe4f6";

        let json = {
            "input_value": input_value,
            "input_value_extra": input_value_extra
        }
        $.post(url_r, json, function(res){
            console.log(res)
        });



    })


    $('#formCreateNewEnterprise').on('submit', function(e){
        e.preventDefault()
        var formData = new FormData(this);

        $.ajax({
            type:'POST',
            url: $(this).attr('action'),
            data:formData,
            cache:false,
            contentType: false,
            processData: false,
            success:function(data){
                console.log("success");
                console.log(data);
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });
    });
    $('#ImageBrowse').on("change", function() {
        $("#imageUploadForm").submit();
    });

    $("#formCreateNewCatalog").on('submit', function(e){
        e.preventDefault();
        
        let formData = new FormData(this)
        
        $.ajax({
            type:'POST',
            url: $(this).attr('action'),
            data:formData,
            cache:false,
            contentType: false,
            processData: false,
            success:function(data){
                console.log("success");
                console.log(data);
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });
    })

    $("#btnQualify").on('click', function(e){
        e.preventDefault();

        let punctuality_value = $('input[name="punctuality_score"]:checked').val();
        let quality_value = $('input[name="quality_score"]:checked').val();
        let price_value = $('input[name="price_score"]:checked').val();
        let customer_support_value = $('input[name="customer_support_score"]:checked').val();
        
        console.log(punctuality_value + quality_value + price_value + customer_support_value)

        let json = {
            "punctuality_score" : punctuality_value,
            "quality_score" : quality_value,
            "customer_support_score" : customer_support_value,
            "price_score" : price_value
        
        }

        console.log(json)

        $.post("/api/score", json, function(res){
            console.log(res);
        });

    })


});
*/
Page('/', showBengalaApp);
Page()

function showBengalaApp(){

            
    ReactDom.render(
      <Layout/>,
      document.getElementById('principalContainer')
    );
  

}


/*
ReactDom.render((
    <Router history={browserHistory}>
        <Route path="/" component={Layout}>
            <Route path="convocatorias" component={CallApp}/>
        </Route>
    </Router>
), document.getElementById('principalContainer'))
*/
/*
ReactDom.render(
  <EnterpriseprofileApp />,
  document.getElementById('enterpriseprofileView')
);
/*
ReactDom.render(
  <GeneralAdmPanel />,
  document.getElementById('GeneralAdministrationPanel')
);
ReactDom.render(
  <SellApp />,
  document.getElementById('wrapperSellsComponent')
);

ReactDom.render(
  <CallApp />,
  document.getElementById('wrapperPrincipalComponentsPlatformView')
);
*/
/*
ReactDom.render(
  <SearchBox />,
  document.getElementById('wrapperSearchBox')
);
*/
