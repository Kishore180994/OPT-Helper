    var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	
	var x=10;
	var y=10;
	var k = document.getElementById("kv").value;
	var n = document.getElementById("nv").value;
	var width = canvas.scrollWidth;
	var height = canvas.scrollHeight;
	var grid =[];
	var lifts = [];
	var positions = [];
	function line(x1,y1,x2,y2)
	{
	    context.beginPath();
	    context.moveTo(x1, y1);
	    context.lineTo(x2, y2);
	    context.stroke();
	}
	function Lift(i,j)
	{
		this.i = i;
		this.j = j;
		this.show = function()
		{
			var h = height/n;
	        var w = width/k;
	        var x = this.i*w;
	        var y = this.j*h;
	        
	        context.beginPath();
		    context.fillStyle = "red";
		    context.fillRect(x, y, w, h);
		    context.stroke();
		}
	}
	
	function Cell(i,j)
	{
		this.i = i;
		this.j = j;
		this.show = function(){
	        var h = height/n;
	        var w = width/k;
	        var x = this.i*w;
	        var y = this.j*h;
	        context.beginPath();
		    context.rect(x,y,w,h);
		    context.stroke();
	    }
		
		this.highlight = function() {
			var h = height/n;
	        var w = width/k;
	        var x = this.i*w;
	        var y = this.j*h;
	        context.fillStyle = "green";
	        context.fillRect(x, y, w, h);
	      }
	}
	
	function Positions(i,j)
	{
		this.i = i;
		this.j = j;	
	}
	
	var init = function()
	{
		for(var i=0;i<k;i++)
		{
			var pos = new Positions(i,0);
			positions.push(pos);
		}
	    for(var j=0;j<n;j++)
	    {
	    	for(var i=0;i<k;i++)
	    	{
	    		var cell = new Cell(i,j);
	    		grid.push(cell);
	    	}
	    }
	    var l=0;
	    for(var i=k*(n-1);i<(k*n);i++)
	    {	    	
	    	lifts[l] = grid[i];  	
	    	l++;
	    }
	    
	    for(var t=0;t<n;t++)
	   	{
	    	// 1. Create the button
	    	var button = document.createElement("button");
	    	button.innerHTML = "Level "+(lifts[t].i+1);
	    	button.onclick  = function(){ 
	    	};
	    	
	    	//append the button
	    	var body = document.getElementsByTagName("body")[0];
	    	body.appendChild(button);
	    	
	   	}
	}
	
	var draw = function()
	{
	    init();
	    
	    //TASK 1
	    //Send the lifts current positions to spring
	    function createAnArray(){
	        $.ajax({
	             contentType: "application/json",
	             type: "POST",
	             url: "/processForm",
	             data: JSON.stringify(postions),
	             success: function(data, textStatus ){
	            	 console.log(data);
	            	 alert("success");
	            	 },
	             error: function(xhr, textStatus, errorThrown){
	            	 alert('request failed'+errorThrown);
	            	 }
	        });
	    }
	    
	    //TASK 2
	    //Get the new position values from spring
	    
	    
	    for(var i=0;i<grid.length;i++)
        {
            grid[i].show();
        }
        
        for(var i=0;i<lifts.length;i++)
        {
        	lifts[i].i = positions[i].i;
        	lifts[i].j = positions[i].j;
        }
        for(var i=0;i<lifts.length;i++)
        {
        	lifts[i].highlight();
        }
	}

	draw();