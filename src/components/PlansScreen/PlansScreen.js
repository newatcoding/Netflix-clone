import React, { useEffect, useState } from 'react';
import './PlansScreen.css';
import db from "../../firebase";
function PlansScreen() {
    const plans=[
        {name:"Netflic Standard",description:"1080p",current:false },
        {name:"Netflic Basic",description:"480p",current:false },
        {name:"Netflic Premium",description:"4k+HDR",current:true }
    ]
    const [products,setProducts] =useState(plans);

    // useEffect(()=> {
    //     db.collections("products").where("active", "==",true)
    //     .get().then((querySnapshot) => {
    //         const products={};
    //         querySnapshot.forEach(async productDoc => {
    //             products[productDoc.id]=productDoc.data();
    //             const priceSnap =await productDoc.ref.collection("prices").get();
    //             priceSnap.docs.forEach(price => {
    //                 products[productDoc.id].prices = {
    //                     priceId: price.id,
    //                     priceData:price.data()
    //                 }
    //             })
    //         })
    //     });
    //     setProducts(products);
    // },[]);

    // const loadCheckout= async (priceId) => {
    //     const docRef=await db.collection("customers").doc(user.uid).collection("checkout_sessions")
    //     .add({
    //         price:priceId,
    //         success_url:window.location.origin,
    //         cancel_url:window.location.origin,
    //     });

    //     docRef.onSnapshot(async(snap) => {
    //         const {error, sessionId} = snap.data();
    //         if(error){
    //             alert(`An error occured ${error.message}`);
    //         }

    //         if(sessionID){
    //             const stripe = 
    //         }
    //     })
    // };
    return (
        <div className="plansScreen">
          {Object.entries(products).map(([productId, productData]) => {
              //code
              return (
                  <div className="planScreen_plan" key={productId}>
                      <div className="planScreen_info">
                          <h5>{productData.name}</h5>
                          <h6>{productData.description}</h6>
                      </div>
                      <button 
                        // onClick={() =>{loadCheckout(productData.prices.priceId)}}
                        style={{"backgroundColor": productData.current?"grey":null}}
                        >{productData.current?"Current Package":"Subscribe"}</button>
                  </div>
              );
          })}
        </div>
    )
}

export default PlansScreen;
