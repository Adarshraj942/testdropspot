import { useEffect, useId, useState } from "react";
import './ProductsCard.css'
import { Tab } from '@headlessui/react'
import {
  Card ,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
} from "@shopify/polaris";
import { Toast, useNavigate } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import axios from "axios";

export function ProductsCard() {
  const [CardLogin,setCardLogin]=useState(true);
  const [CardSignup,setCardSignup]=useState(false);
  const [CardProductorder,setCardProductorder]=useState(false);
  const [CardProductListing,setCardProductListing]=useState(false);

  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(false);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();
  const [product,setProduct]=useState([])
const [loginInfo,setLoginInfo]=useState({
  email:"",
  password:""
})

const handleChange = (e) => {
  setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (loginInfo.email === "") {
    setError2(true);
  } else {
    try {
      const { data } = await axios.post("https://server.dropspot.in/auth/login",loginInfo);
      console.log(data);
      sessionStorage.setItem("userInfo", data);
      console.log(data.user._id);
      sessionStorage.setItem("userId", data.user._id);
      resetForm();
      setCardLogin(false)
      setCardProductListing(true)
      const uxxl=window.location.href
      sessionStorage.setItem("url", uxxl);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }
};



const resetForm = () => {

  setLoginInfo({ email: "",  password: "" });
};
  const userId=sessionStorage.getItem("userId")
 useEffect(()=>{
    if(userId){
      setCardLogin(false)
      setCardProductListing(true)
    }
 },[])
  useEffect(() => {
    
    async function fetchData() {
      // You can await here
      const {data}=await axios.get("https://server.dropspot.in/product/getproducts/1")
      setProduct(data)
      console.log(data);
      // ...
    }
    fetchData()
//  if(userId!==""){
//   fetchData();
//  }else{
//      navigate("https://dropspot.in/signin")
//  }
  }, []); // Or [] if effect doesn't need props or state

  const {
    data,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/products/count",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );
  const buttonheader={
    backgroundColor:'#FDE31A',
    borderRadius:'15px',
    borderColor:'transparent',
    width:'auto',
    alignItems:'center',
    height:'80px',
    alignSelf:'center',
    boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.15)',
    
  }

  const tabpanls={
    padding:'30px',
  
  }
  const handlePopulate = async () => {
   
    alert()

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: product })
  };
    const response = await fetch("/api/products/create",requestOptions);
 
    console.log(response);
    if (response.ok) {
      await refetchProductCount();

      setToastProps({ content: "products created!" });
    } else {
      setIsLoading(false);
      setToastProps({
        content: "There was an error creating products",
        error: true,
      });
    }
  };



  const list={
    backgroundColor:'#FFE51A',
    borderColor:'transparent',
    padding:'5px',
    width:'70px',
    borderRadius:'10px',
    margin:"5px 0px 5px 0px"
    
  }
  const order={
    backgroundColor:'black',
    borderColor:'transparent',
    padding:'5px',
    width:'70px',
    borderRadius:'10px',
    color:'white',
  }
  const handelTabCLick = (e) => {
    setTabSelected(e);
  };

  const [tabSelected, setTabSelected] = useState(null);

  return (
    <>
      
      {
        CardProductListing && <Card
      
   
      >
        
        <hr />
        <Tab.Group>
        <div  className='conatiner' style={buttonheader}>
        <Tab.List className="flex space-x-1 rounded-xl  p-1">
        <Tab className={`tabbtn3 ${tabSelected === 1 ? "selected-tab1" : ""}`}
                    onClick={() => handelTabCLick(1)}>Product Listing</Tab>
        <Tab className={`tabbtn3 ${tabSelected === 2 ? "selected-tab1" : ""}`}
                    onClick={() => handelTabCLick(2)}>Export Order</Tab>
      </Tab.List>
        </div>
     
      <Tab.Panels style={tabpanls}>
        <Tab.Panel>
        

        <table  className="table" border={0} >
             <thead className="tablehead" >
             <tr  style={{color:"black",margin:'20px'}}>
                <th style={{padding:'10px',width:'50px'}}>SELECT</th>
                
                <th>NAME</th>
                <th>Image</th>
                <th>SKU ID</th>

                <th>ACTIONS</th>
              </tr>
             </thead>
        {product &&
            product.length > 0 &&
            product.map((ele) => (
              <tbody>
                
              <tr>
                <td><input type="checkbox" name="" id="" /></td>
                <td>image</td>
              <td  style={{color:"black"}}>{ele.name}</td>
              <td  style={{color:"black"}}>{ele._id}</td>
              <td>
               <div >
               <div> <button style={list} >LIST</button></div>

               </div>
             </td> 
            </tr>
              </tbody>
             
           
               ))}
               <div align='right' className="Export" ><button>Add Products</button></div> 
               </table>
        </Tab.Panel>
        <Tab.Panel>
        <table border="1" className="table">
             <thead className="tablehead">
             <tr  style={{color:"black",margin:'20px'}}>
                <th style={{padding:'10px',width:'50px'}}>SELECT</th>
                
                <th>NAME</th>
                <th>Image</th>
                <th>SKU ID</th>

                <th>ACTIONS</th>
              </tr>
             </thead>
        {product &&
            product.length > 0 &&
            product.map((ele) => (
             
              <tbody>
              
              <tr>
                <td><input type="checkbox" name="" id="" /></td>
                <td>image</td>
              <td  style={{color:"black"}}>{ele.name}</td>
              <td  style={{color:"black"}}>{ele._id}</td>
              <td>
               <div style={{display:'inline'}}>
             
               <div><button style={order}>Export</button></div>

               </div>
             </td> 
            </tr>
              </tbody>
             
           
               ))}
               <div align='right' className="Export" ><button>Export Order</button></div> 
               </table>
               
        </Tab.Panel>
      
      </Tab.Panels>
    </Tab.Group>
        
               
      </Card>
      }
       {
        CardLogin &&  <Card
       
       >
         <TextContainer spacing="loose">
           <h4 className="login">
             Login.
           </h4>
           
         </TextContainer>
         <hr />
         <div  className="formcontainer">
         <form onSubmit={handleSubmit}>
           <div style={{display:'inline'}}>
             <div ><label className="label" htmlFor="">Email</label></div>
             <div>
             <input
             className="inputbox"  
             name="email"
            
             type="Email"
value={loginInfo.email}
onChange={handleChange}
              
              />
                 {error2 && (
              <span style={{ color: "red" }}>Email is required</span>
            )}
             </div>
           </div>
           <div style={{display:'inline'}}>
             <div><label  className="label"  htmlFor="">Password</label></div>
             <div>
             <input 
             className="inputbox" 
              type="password" 
              name="password"
          
           
              value={loginInfo.password}
              onChange={handleChange}
              />
               {error && (
              <span style={{ color: "red" }}>Password is required</span>
            )}
             </div>
           </div>
           <div>
           <label>
             <input  type="checkbox" checked="checked" name="remember" /> Remember me
           </label>
           </div>
           <button className="submitbtn" >Login</button>
           
         <div style={{display:'flex',justifyContent:'space-between',margin:'20px 0px 0px 0px'}}>
           <div>
           <p>Create Your New Account?SignUp</p>
           </div>
           <div>
           <span >Forgot <a href="#" style={{color:'rgba(255, 214, 0, 1)'}}>password?</a></span>
           </div>
         </div>
         </form>
         </div>
                
       </Card>
       }
      {
        CardSignup && <Card
       
       >
         <TextContainer spacing="loose">
           <h4 className="login">
             Sign Up.
           </h4>
           
         </TextContainer>
         <hr />
         
         <div  className="formcontainer">
         <form action="">
           <div style={{display:'inline'}}>
             <div><label className="label"  htmlFor="">Email</label></div>
             <div>
             <input
             className="inputbox" 
              type="email" />
             </div>
           </div>
           <div style={{display:'inline'}}>
             <div><label className="label"  htmlFor="">Password</label></div>
             <div>
             <input
             className="inputbox"  
              type="password" />
             </div>
           </div>
           <div style={{display:'inline'}}>
             <div><label className="label"  htmlFor="">Conferm Password</label></div>
             <div>
             <input 
             className="inputbox" 
              type="Conferm password" />
             </div>
           </div>
           <div style={{display:'inline'}}>
             <div><label className="label"  htmlFor="">Account Type</label></div>
             <div>
             <select className="inputbox"  name="" id="">
               <option value="">Seller</option>
               <option value="">Dropshoper</option>
             </select>
             </div>
           </div>
           <div><p><span><input type="checkbox" /></span>By clicking "Next", you agree to the user
           agreement and privacy policy
         </p></div>
           <button className="submitbtn">Sign up</button>
           <div style={{margin:'20px 0px 0px 0px'}}>Alredy have an Account? <a style={{color:'rgba(255, 214, 0, 1)'}} href='login' />login</div>
         </form>
         </div>
                
       </Card>
      }
     {
      CardProductorder &&  <Card
       style={{color:"red"}}
        title="LIST ORDER"
        sectioned
        primaryFooterAction={{
          content: "Add  products",
          onAction: handlePopulate,
          loading:isLoading 
        }}
      >
        <TextContainer spacing="loose">
          <p>
            Sample products are created with a default title and price from Dropspot. You can
            remove them at any time   .
          </p>
          <Heading element="h4">
            TOTAL PRODUCTS
            <DisplayText size="medium">
              <TextStyle variation="strong">
                {isLoadingCount ? "-" : data.count}
              </TextStyle>
            </DisplayText>
          </Heading>
        </TextContainer>
        <hr />
       
       
               
      </Card>
     }
    </>
  );
}