import {LoginButton, SessionProvider} from "@inrupt/solid-ui-react";



function  Login( ){

    const provider="https://login.inrupt.com/"; //url of the pod provider. Will consider making a multiple choice cbox.
    const appName="LoMap"; //Our app where the user has been redirected from

    //sessionProvider Wil provide child components of session data.
    //Its VERY important that login button is inside a session data component.
    return (
        <SessionProvider>
            <section name="login">
                    <LoginButton oidcIssuer={provider} redirectUrl={window.location.href} clientName={appName}>Login</LoginButton>
            </section>
        </SessionProvider>

    );
}
export default Login;