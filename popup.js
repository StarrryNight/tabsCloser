document.addEventListener('DOMContentLoaded', function () {
    l();
}, false);
function l() {
    var subdomains;
    var s = "";
    var booleans = [];
    var checkboxess;
    var realsubdomain = [];
    var textArray = [];
    var checkButton = document.getElementById('check');
    const timer = ms => new Promise(res => setTimeout(res, ms))
    
var checkAllButton = document.getElementById('checkAll');

    chrome.tabs.query({}).then((tab) => {
        var ifShow = true;
        for (i in tab) {
            var text;
            var a = tab[i].url;

            var subdomain = a.split('.');
            if (subdomain[0] == "https://www") {
                realsubdomain.push("https://" + subdomain[1]);
                text = "https://" + subdomain[1];
                if (check(textArray, text)) {
                    textArray.push(text);
                    ifShow = true;
                }
                else {
                    ifShow = false;
                }


            }
            else {

                realsubdomain.push(subdomain[0]);
                text = subdomain[0];
                if (check(textArray, text)) {
                    textArray.push(text);
                    ifShow = true;
                }
                else {
                    ifShow = false;
                }
            }

            var b = "div" + i;
            if (ifShow) {
                const para = document.createElement("label");
                para.setAttribute("for", 'checkbox');

                const checkbox = document.createElement("input");
                checkbox.setAttribute("type", 'checkbox');

                checkbox.setAttribute("id", i);
                para.innerHTML = text;
                const div = document.createElement("div");
                
                div.setAttribute("id", b);
                checkbox.classList.add("checkboxes");
                div.classList.add("divt");
                checkbox.checked = false;
                document.getElementById("myDIV").appendChild(div);
                document.getElementById(b).appendChild(checkbox);
                document.getElementById(b).appendChild(para);
            }



        }

    }
    )


    function check(array, target) {
        for (i = 0; i < array.length; i++) {
            if (target == array[i]) {

                return false;
            }
        }
        return true;
    }

    function check1(array, target) {
        for (i = 0; i < array.length - 1; i++) {
            if (target == array[i]) {

                return false;
            }
        }
        return true;
    }

    checkAllButton.addEventListener('click' ,function(){
        checkboxess = document.querySelectorAll(".checkboxes");
        for(i=0;i<checkboxess.length;i++){
                checkboxess[i].checked=true;
        } 
        
    })
    checkButton.addEventListener('click', async function () {

        checkboxess = document.querySelectorAll(".checkboxes");

        checkcheckboxes();

        chrome.tabs.query({}).then((tabs) => {

            for (var i in tabs) {

                // if (checkSubdomain(realsubdomain[i])) {
                //     console.log(tabs[i].id)
                //     chrome.tabs.remove(tabs[i].id)

                // }



            }

            // for (var i = 0; i < tabs.length; i++) {

                


            // }
               var tab = tabs;
               
               
            function closeIndividually(i, tab) 
{if (checkSubdomain(realsubdomain[i])) {
    console.log(tabs[i].id)
    chrome.tabs.remove(tabs[i].id)
    if(i===tab.length-1){
        window.close();
    }

} }
                    

            async function closeTabs(){
                for (var i = 0; i < tabs.length; i++){
                    closeIndividually(i,tab);
                    await timer(100);}
            }
              
closeTabs();

        
           function close(){
            window.close();
           } 
        })
        // chrome.windows.getAll({ populate: true }, getAllOpenWindows);


    }, false);


    function checkcheckboxes() {
        for (i = 0; i < checkboxess.length; i++) {
            if (checkboxess[i].checked == false) {
                booleans.push(false);
            }
            else (booleans.push(true));

        }
        var b = "";
        for (i = 0; i < booleans.length; i++) {
            b = b + "" + booleans[i];
        }

    }

    function checkSubdomain(target) {
        for (i in checkboxess) {
            if (booleans[i] == true && target == textArray[i]) {
                s = s + "      boolean =     " + booleans[i] + "     text =    " + textArray[i] + " " + target;
                return true;

            }
            s = s + "      boolean =     " + booleans[i] + "     text =    " + textArray[i] + " " + target;
        }
        return false;
    }

}

function getRootDomain(url) {
    var domainKeys = url.split("/")[2].split("\\.");
    var length = domainKeys.length;
    var dummy = domainKeys[0] == ("www") ? 1 : 0;
    if (length - dummy == 2)
        return domainKeys[length - 2] + "." + domainKeys[length - 1];
    else {
        if (domainKeys[length - 1].length == 2) {
            return domainKeys[length - 3] + "." + domainKeys[length - 2] + "." + domainKeys[length - 1];
        }
        else {
            return domainKeys[length - 2] + "." + domainKeys[length - 1];
        }
    }

}


