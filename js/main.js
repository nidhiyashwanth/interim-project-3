// Code to populate select tags with json data
var collegeNameArr = [];

//variable indicating button inorder to implement event further.
const btn = document.getElementById("submitButton")

//loop through the colleges and select the name by calling it by its id
    for(var i=0;i<colleges.length;i++){ 
    var value = colleges[i];
    if(collegeNameArr.includes(value.College_Name)){
        continue;
}
     else{
            var college_name = document.getElementById("college-name")
            college_name.innerHTML += "<option>"+ value.College_Name +"</option>"
            $(college_name).on('change',function(){
            });
            collegeNameArr.push(value.College_Name)
    }
}

//after selecting the college, select the caste names that a college accepts.
$("#college-name").on('change',function(){
    var value=$(this).val(); //get its selected value
    result = "";
    var Caste = [];
    for(var i=0;i<colleges.length;i++){
        if(colleges[i].College_Name === (value) && !Caste.includes(colleges[i].Caste)){
            Caste.push(colleges[i].Caste);
            result+="<option>"+colleges[i].Caste+"</option>"
        }
        else{
                continue;
        }
    }
    var college_caste = document.getElementById("caste-name")
    college_caste.innerHTML = result;
});

// Code to validate the input fields to check if they're numeric or not.
function validate(){
var formdata  = document.getElementsByClassName("collegeForm")
var This_id = $(this);
if(formdata[0].checkValidity()){
    document.getElementById('submitButton').removeAttribute("disabled");
}  
else{
    document.getElementById('submitButton').disabled = true
}
    let value = (This_id[0].checkValidity())? "":This_id[0].validationMessage;
    This_id.siblings("div")[0].innerHTML = value;
}
//enable the submit button after all the fields are validated and filled.
$(".form-control").keyup(validate); 


//Function to check the given conditions.
function findCollege() {
    var collegeArr = [];
    var collegeName = document.getElementById("college-name").value;
    var casteName = document.getElementById("caste-name").value;
    var annualIncome = document.getElementById("annualIncome").value;
    var percentage = document.getElementById("percentage").value;
    
//remove pre-existing content
    if(document.getElementById("output_page")){
      document.getElementById("output_page").remove();
  }
  var college_card = ''
  let flag = true;
  for(var i=0;i<colleges.length;i++){
    var value = colleges[i];  
    //if college name and caste match and the annual fee is less than 70% of annaulIncome
    if(value.College_Name == collegeName && value.Caste == casteName && 0.7*parseInt(value.Annual_Fee)<=annualIncome){
      if(flag){
        //Only show the available college along with annual fee.
        college_card += `<div class="card">
                <div class="flip-card">
                  <div class="flip-card-inner">
                    <div class="flip-card-front">
                      <img src="images/`+value.College_Name+`.jpg" alt="`+value.College_Name+`" style="width:300px;height:300px;">
                    </div>
                    <div class="flip-card-back">
                      <div class= "flip-card-back-text">
                      <h2>Course: `+value.Course+`</h2> 
                      <h2>Fee: `+value.Annual_Fee+` </h2>
                      <p><button>Apply Now</button></p>
                      </div>
                    </div>
                  </div> 
                  <h2>`+value.College_Name+`</h2>
                </div>
              </div>`;
      }  
      else{
        college_card += `
        <div class="card">
                  <div class="flip-card">
                    <div class="flip-card-inner">
                      <div class="flip-card-front">
                        <img src="images/`+value.College_Name+`.jpg" alt="`+value.College_Name+`" style="width:300px;height:300px;">
                      </div>
                      <div class="flip-card-back">
                        <div class= "flip-card-back-text">
                        <h2>Course: `+value.Course+`</h2> 
                        <h2>Fee: `+value.Annual_Fee+` </h2>
                        <p><button>Apply Now</button></p>
                        </div>
                      </div>
                    </div> 
                    <h2>`+value.College_Name+`</h2>
                  </div>
                </div>`;
      }
      collegeArr.push(value)
    console.log(value)
    }
  }
console.log(collegeArr)


//if there are no colleges for the annual income provided.
if(collegeArr.length == 0){
  var college_card = '<div id="output_display"><h3>Available scholarships based on the marks are: </h3>'
  for(var i=0;i<colleges.length;i++){
      var value = colleges[i];
      if(value.Caste == casteName && parseInt(value.Scholarship_Marks)<=percentage){
        if (flag) {
          //Show Available scholarship information along with fee and the course offered.
          college_card += `
          <div class="card">
                    <div class="flip-card">
                      <div class="flip-card-inner">
                        <div class="flip-card-front">
                          <img src="images/`+value.College_Name+`.jpg" alt="`+value.College_Name+`" style="width:300px;height:300px;">
                        </div>
                        <div class="flip-card-back">
                          <div class= "flip-card-back-text">
                          <h2>Course: `+value.Course+`</h2> 
                          <h2>Fee: `+value.Annual_Fee+` </h2>
                          <h2>Scholarship: `+value.Scholarship_Amount+` </h2>
                          <p><button>Apply Now</button></p>
                          </div>
                        </div>
                      </div> 
                      <h2>`+value.College_Name+`</h2>
                    </div>
                  </div>`;
        } 
        else {
          college_card += `
          <div class="card">
                    <div class="flip-card">
                      <div class="flip-card-inner">
                        <div class="flip-card-front">
                          <img src="images/`+value.College_Name+`.jpg" alt="`+value.College_Name+`" style="width:300px;height:300px;">
                        </div>
                        <div class="flip-card-back">
                          <div class= "flip-card-back-text">
                          <h2>Course: `+value.Course+`</h2> 
                          <h2>Fee: `+value.Annual_Fee+` </h2>
                          <h2>Scholarship: `+value.Scholarship_Amount+` </h2>
                          <p><button>Apply Now</button></p>
                          </div>
                        </div>
                      </div> 
                      <h2>`+value.College_Name+`</h2>
                    </div>
                  </div>`;
        }
        collegeArr.push(value)
        }     
      }console.log(value) 
      console.log(collegeArr)
    }
    college_card+='</div>'
    var result_block = document.getElementById("res_block");
    result_block.classList.remove('output_page');
    result_block.innerHTML = college_card;
}
btn.addEventListener("click", findCollege);