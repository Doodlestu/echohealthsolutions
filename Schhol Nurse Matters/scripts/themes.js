function changeCSS(cssFile, cssLinkIndex) {

    //alert ("In function: " + cssFile + cssLinkIndex)

    var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);

    //Storing the theme link into local storage
    if (typeof (cssFile) !== "null") {

        //alert("Wait a min I am going to save in the local storage ");

        localStorage.setItem("CSSFile", cssFile);

    }


}
