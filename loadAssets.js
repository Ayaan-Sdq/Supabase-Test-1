/*
Classes: document.getElementByClassName()
ID's: document.getElementById()
*/

// All html code once the html has loaded
// updateHTML();

function updateHTML () {

    updateNavBar();

}

function updateNavBar () {

    if (clientSession) {

        document.getElementById("navigationBarDiv").insertAdjacentHTML("beforeend", `
            <ul>
                
                <li><a href="dashboard.html">Dashboard</a></li>

                <li><a href="search.html">Search</a></li>

                <li><a href="chatbotHelp.html">Ask Neighbert</a></li>

                <li><a href="requestForm.html">Make an Update</a></li>

                <li class="dropdown">
                    <a href="#">Account</a>
                    <ul class="dropdownMenu">
                        <li><a href="accountSettings.html">Account Settings</a></li>
                        <li><a href="javascript:signOut()">Log Out</a></li>
                    </ul>
                </li>

            </ul>    
        `)

    } else {

        document.getElementById("navigationBarDiv").insertAdjacentHTML("beforeend", `
            <ul>

                <li><a href="index.html">Home</a></li>

                <li><a href="search.html">Search</a></li>

                <li><a href="login.html">Ask Neighbert</a></li>

                <li class="dropdown">
                    <a href="#">Account</a>
                    <ul class="dropdownMenu">
                        <li><a href="signup.html">Sign Up</a></li>
                        <li><a href="login.html">Log In</a></li>
                        <li><a href="signup.html">Request Update</a></li>
                    </ul>
                </li>

            </ul>    
        `);
        
    }

}