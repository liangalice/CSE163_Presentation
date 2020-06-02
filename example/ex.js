/*global window, console, d3 */
/* ----------------------------------------------------------------------------
File: BarGraphSample.js
Contructs the Bar Graph using D3
80 characters perline, avoid tabs. Indet at 4 spaces. See google style guide on
JavaScript if needed.----------------------------------------------------------------------------*/ 
/*eslint-env es6*/
/*eslint-env browser*/
/*eslint no-console: 0*/
/*global d3 */

// 1599198 Alice Liang
// var x =d3.interpolate("1995, 2, 15", "1995, 11, 40")(0.5);

function changeName()
{
    // changing names of field / text to type
    var fieldName = document.getElementById("type").value;
    var changeFieldName1 = document.getElementById('labelID1');
    var changeFieldName2 = document.getElementById('labelID2');
    changeFieldName1.innerText = fieldName;
    changeFieldName2.innerText = fieldName;
}

// moving circles to show different animations
// button to check if its clicked to show and hide
// same circles with diff ease types and y postiions
    var svg = d3.select("body")
        .append("svg")
        .attr("width", 960)
        .attr("height", 800);
    function show()
    {
      var checkClicked = document.getElementById("d3click");
      // hide if none
      if(checkClicked.style.display =="none")
      {
        x.style.display = "block";
      }
      else // draw
      {
        //
        var easeLinear = svg.append("circle")
            .attr("fill", "powderblue")
            .attr("r", 20);
            easeLinear
            .attr('cx', 210)          
            .attr('cy', 200+100) 
            .transition()             
            .ease(d3.easeLinear)           // control speed of the transition
            .duration(4000)           // 4000 milliseconds
            .attr('cx', 720)   ;       // move to 720 on x axis
        var easeLinear = svg.append("text")
            .attr("dy", ".35em") 
            .attr("x", 100)
            .attr("text-anchor", "middle") 
            .attr("y", 200+100)
            .text("easeLinear");
        //////////////////////////////////////////////////////
        var easeCubicIn = svg.append("circle")
            .attr("fill", "powderblue")
            .attr("r", 20);
            easeCubicIn
            .attr('cx', 210)          
            .attr('cy', 250+100) 
            .transition()             
            .ease(d3.easeCubicIn)        
            .duration(4000)           
            .attr('cx', 720);       
        var easeCubicIn = svg.append("text")
            .attr("dy", ".35em") 
            .attr("x", 100)
            .attr("text-anchor", "middle") 
            .attr("y", 250+100)
            .text("easeCubicIn");
        //////////////////////////////////////////////////////
        var easeCubicOut = svg.append("circle")
            .attr("fill", "powderblue")
            .attr("r", 20);
            easeCubicOut
            .attr('cx', 210)          
            .attr('cy', 300+100) 
            .transition()             
            .ease(d3.easeCubicOut)    
            .duration(4000)           
            .attr('cx', 720);       
        var bounceOutText = svg.append("text")
            .attr("dy", ".35em") 
            .attr("x", 100)
            .attr("text-anchor", "middle") 
            .attr("y", 300+100)
            .text("easeCubicOut");        
        //////////////////////////////////////////////////////
        var easeInOut = svg.append("circle")
            .attr("fill", "powderblue")
            .attr("r", 20);
            easeInOut
            .attr('cx', 210)          
            .attr('cy', 350+100) 
            .transition()             
            .ease(d3.easeCubicInOut)       
            .duration(4000)           
            .attr('cx', 720);       
        var easeType2 = svg.append("text")
            .attr("dy", ".35em") 
            .attr("x", 100)
            .attr("text-anchor", "middle") 
            .attr("y", 350+100)
            .text("easeCubicInOut");

              //////////////////////////////////////////////////////
        var bounceIn = svg.append("circle")
            .attr("fill", "powderblue")
            .attr("r", 20);
            bounceIn
            .attr('cx', 210)          
            .attr('cy', 400+100) 
            .transition()             
            .ease(d3.easeBounceIn)       
            .duration(4000)           
            .attr('cx', 720);       
        var bounceInText = svg.append("text")
            .attr("dy", ".35em") 
            .attr("x", 100)
            .attr("text-anchor", "middle") 
            .attr("y", 400+100)
            .text("easeBounceIn");

        //////////////////////////////////////////////////////
        var bounceOut = svg.append("circle")
            .attr("fill", "powderblue")
            .attr("r", 20);
            bounceOut
            .attr('cx', 210)          
            .attr('cy', 450+100) 
            .transition()             
            .ease(d3.easeBounceOut)       
            .duration(4000)           
            .attr('cx', 720);       
        var bounceOutText = svg.append("text")
            .attr("dy", ".35em") 
            .attr("x", 100)
            .attr("text-anchor", "middle") 
            .attr("y", 450+100)
            .text("easeBounceOut");
      } 
    }
function calculate()
{
    // gets value of input1,input2 and calls interpolate on it
    // all if statements can be removed and it will have
    // same output bc interpolate determines for us
    var fieldName = document.getElementById("type").value;
    var firstDate = document.getElementById("fDate").value;
    var secondDate = document.getElementById("sDate").value;
    // console.log(secondDate);
      if(fieldName == "Date")
      {
        var value = d3.interpolate(firstDate,secondDate)(0.5);
        console.log(d3.interpolate);
        var name = document.getElementById("enter");
        name.value = value;
      }
      else if( fieldName == "Color")
      {
        // console.log(d3.interpolate());
         var value = d3.interpolate(firstDate,secondDate)(0.5);
        console.log(d3.interpolate);
        var name = document.getElementById("enter");
        name.value = value;
      }
      else if (fieldName == "Number")
      {
        var value = d3.interpolate(firstDate,secondDate)(0.5);
        var name = document.getElementById("enter");
        name.value = value; 
        console.log(d3.interpolate);
      }
      else
      {
        var value = d3.interpolate(firstDate,secondDate)(0.5);
        var name = document.getElementById("enter");
        name.value = value;
        console.log(d3.interpolate);
      }
}