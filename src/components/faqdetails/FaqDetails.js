import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";


const data = {
    title: "FAQ",
    rows: [
        {
            title: "How to set up a MetaMask account?",
            content: <div>
                <p>Visit the Chrome Web Store and search for MetaMask</p>
                <p>Click "Add Extension"</p>
                <p>Click "Get Started"</p>
                <p>Click "I agree"</p>
                <h4>IMPORTANT: Reveal the Secret Recovery Phrase and write it down and/or save it somewhere digitally protected</h4>
                <p>You have now created a MetaMask wallet</p>
            </div>,
        },
        {
            title: "How to register at PIZZANFT.STUDIO and connect your MetaMask wallet?",
            content: <div>
                <p>Follow the steps to register and connect your wallet:</p>
                <ul>
                    <li>Click "Sign Up" on the PIZZANFT.STUDIO homepage</li>
                    <li>Enter your email address, select a username and password</li>
                    <li>Sign in to PIZZANFT.STUDIO using your credentials and click "Connect"</li>
                    <li>Sign into your MetaMask account</li>
                    <li>You have now connected your MetaMask wallet on PIZZANFT.STUDIOClick "Accept"</li>
                </ul>
            </div>,
        },
        {
            title: "How do I buy aNFTs with crypto?",
            content: <div>
                <h4>To purchase an aNFT using crypto:</h4>
                <p>Step 1: Go to PIZZANFT.studio Marketplace and select the collection you want to buy</p>
                <p>Step 2: Click “Select & Buy” and define the NFT’s token ID you would like to buy.</p>
                <p>Step 3: Validate two Metamask transactions:</p>
                <ul>
                    <li>1 - You will be asked to approve spending your $PIZZA token.</li>
                    <li>2 - Confirm the transaction, completing your effective aNFT purchase.</li>
                </ul>
            </div>,
        },
        {
            title: "How can I send aNFT to another person?",
            content: <div>
                <h4>To transfer your aNFT to another wallet address, you will need to:</h4>
                <p>Step 1: Log in to the PIZZANFT.studio marketplace with your Metamask wallet,</p>
                <p>Step 2: Visit my “My collections” section and select the aNFT you would like to send,</p>
                <p>Step 3: Click on “Gift” icon and define the recipient’s wallet address,</p>
                <p>Step 4: Validate the transaction in the Metamask pop-up window.</p>
            </div>,
        },

    ],
};

const config = {
    animate: true,
    tabFocus: true
};


const FaqDetails = () => {
    return (
        <>
            <Faq
                data={data}
                config={config}
            />
        </>
    )
}

export default FaqDetails
