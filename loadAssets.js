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

    let currentHTML = window.location.pathname.split("/").pop();

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

        switch (currentHTML) {
            case "accountSettings.html":
            case "chatbotHelp.html":
            case "dashboard.html":
            case "helpForm.html":
            case "requestForm.html": window.location.href = "login.html";
        }

        document.getElementById("navigationBarDiv").insertAdjacentHTML("beforeend", `
            <ul>

                <li><a href="index.html" id="Landing Page Link">
                    <img src="imgLogo.png" width=180>
                </a></li>

                <li><a href="search.html" id="Search Page Link">
                    <span>Find Your Resources</span>
                </a></li>

                <li><a href="chatbotHelp.html" id="Log In Page Link">
                    <span>Ask Neighbert</span>
                </a></li>

                <li><a href="requestForm.html" id="Request Update Page Link">
                    <span>Request Update</span>
                </a></li>

                <li><a href="login.html" id="Log In Page Link">
                        <span>Log In</span>
                </a></li>

            </ul>    
        `);
        
    }

    document.querySelectorAll("nav a").forEach(a => {
        let link = a.getAttribute("href");

        if (link === currentHTML) {
            a.closest("li").classList.add("active");
        }
    });

}