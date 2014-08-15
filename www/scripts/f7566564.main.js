function showErrorPanel(a){var b=$("<div>").addClass("panel panel-danger").append($("<div>").addClass("panel-heading").text("Error")).append($("<div>").addClass("panel-body").text(a));$(".results").empty().append(b)}function loadApp(){$fh.cloud({path:"/recordTest",method:"get",contentType:"application/json"},function(a){$(".spinner").remove();var b=new TestResults(a),c=new TestResultsView({collection:b,el:$(".results")[0]});c.render()},function(a){showErrorPanel("Failed to load test results. You should find out why. Error : "+a)})}var TestResult=Backbone.Model.extend({}),TestResults=Backbone.Collection.extend({model:TestResult}),TestResultsView=Backbone.View.extend({render:function(){var a=this;console.log(this.collection.toJSON());var b=a.$el.find("table");b.dataTable({data:a.collection.toJSON(),paging:!0,pageLength:20,columns:[{title:"Device",data:"deviceInfo.platform"},{title:"OS Version",data:"deviceInfo.version"},{title:"UUID",data:"deviceInfo.uuid"},{title:"Device Model",data:"deviceInfo.model"},{title:"Cordova Version",data:"deviceInfo.cordova"},{title:"Test Time",data:function(a){var b=a.testInfo,c=_.findWhere(b,{stage:"runner_starting"});if(c){var d=c.ts;return moment(d).fromNow()}return"Unknown"}},{title:"Test Results (Failed/Total)",data:function(a){var b=a.testInfo,c=_.findWhere(b,{stage:"complete"});if(c){var d=c.data.failed_specs+"/"+c.data.total_specs;return d}return"Not Completed"}}]})}}),initcalled=!1;$(document).ready(function(){$(".spinner").spin(),$fh.on("fhinit",function(a){initcalled=!0,a?showErrorPanel("FH SDK failed to init. Something is wrong..."):loadApp()}),setTimeout(function(){initcalled||showErrorPanel("FH SDK failed to init in 5 seconds. You should find out why...")},5e3)});