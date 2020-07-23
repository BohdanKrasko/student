(this.webpackJsonpjs=this.webpackJsonpjs||[]).push([[0],{148:function(e,t,n){},202:function(e,t,n){e.exports=n(379)},208:function(e,t,n){},327:function(e,t,n){},379:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(16),o=n.n(i),c=(n(207),n(208),n(62)),l=n(63),s=n(68),u=n(67),d=(n(148),n(76)),m=n(33),f=n(127),h=function(e){if(e.ok)return e;var t=new Error(e.statusText);return t.response=e,e.json().then((function(e){t.error=e})),Promise.reject(t)},E=function(){return Object(f.a)("/api/students").then(h)},p=function(e){return Object(f.a)("/api/students/".concat(e,"/course")).then(h)},g=n(382),y=n(57),S=function(e){return r.a.createElement("div",{style:{width:"1400px",margin:"0 auto"}},e.children)},v=n(385),b=function(e,t,n){v.a[e]({message:t,description:n})},N=function(e,t){return b("info",e,t)},k=function(e,t){return b("error",e,t)},I=n(173),A=n(384),j=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={courses:[],studentId:"",isFetching:!1},e.fetchStudentCourses=function(){e.setState({isFetching:!0});var t=e.props.match.params.studentId;e.setState({studentId:t}),p(t).then((function(e){return e.json()})).then((function(t){e.setState({courses:t}),e.setState({isFetching:!1})})).catch((function(t){var n=t.error.error,a=t.error.description;N(n,a),e.setState({isFetching:!1})}))},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){this.fetchStudentCourses()}},{key:"render",value:function(){var e=this.state,t=e.courses;if(e.isFetching)return r.a.createElement("div",{className:"spinner"},r.a.createElement(I.a,{indicator:r.a.createElement(A.a,{style:{fontSize:24},spin:!0})}));if(t&&t.length){return r.a.createElement(S,null,r.a.createElement(g.a,{dataSource:t,columns:[{title:"Course Id",dataIndex:"courseId",key:"courseId"},{title:"Department",dataIndex:"department",key:"department"},{title:"Description",dataIndex:"description",key:"description"},{title:"Grade",dataIndex:"grade",key:"grade"},{title:"Name",dataIndex:"name",key:"name"},{title:"Start Date",dataIndex:"startDate",key:"startDate"},{title:"End Date",dataIndex:"endDate",key:"endDate"},{title:"Teacher Name",dataIndex:"teacherName",key:"teacherName"}],rowKey:"courseId",pagination:!1}))}return r.a.createElement(S,null,r.a.createElement(y.a,{style:{marginTop:"9em"},image:y.a.PRESENTED_IMAGE_SIMPLE,description:r.a.createElement("h1",null,"No course found")}))}}]),n}(a.Component),O=n(381),x=n(51),C=(n(327),function(e){return r.a.createElement("div",{className:"footer"},r.a.createElement(S,null,void 0!==e.numberOfStudents?r.a.createElement(O.a,{style:{backgroundColor:"#f56a00",marginRight:"5px"},size:"large"},e.numberOfStudents):null,r.a.createElement(x.a,{onClick:function(){return e.handleAddStudentClickEvent()},type:"primary"},"Add new student +")))}),M=n(108),F=n.n(M),w=n(193),D=n(383),T=n(386),L={marginBottom:"10px"},B=function(e){return r.a.createElement(w.a,{initialValues:{firstName:"",lastName:"",email:"",gender:""},validate:function(e){var t={};return e.firstName||(t.firstName="First Name required"),e.lastName||(t.lastName="Last Name required"),e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Email required",e.gender?["MALE","male","FEMALE","female"].includes(e.gender)||(t.gender="Gender must be (MALE, male, FEMALE)"):t.gender="Gender required",t},onSubmit:function(t,n){var a,r=n.setSubmitting;(a=t,Object(f.a)("/api/students",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify(a)}).then(h)).then((function(){e.onSuccess()})).catch((function(t){e.onFailuer(t)})).finally(r(!1))}},(function(e){var t=e.values,n=e.errors,a=e.touched,i=e.handleChange,o=e.handleBlur,c=e.handleSubmit,l=e.isSubmitting,s=e.submitForm,u=e.isValid;return r.a.createElement("form",{onSubmit:c},r.a.createElement(D.a,{style:L,name:"firstName",onChange:i,onBlur:o,value:t.firstName,placeholder:"First name. E.g. John"}),n.firstName&&a.firstName&&r.a.createElement(T.a,{color:"red",style:L},n.firstName),r.a.createElement(D.a,{style:L,name:"lastName",onChange:i,onBlur:o,value:t.lastName,placeholder:"Last name. E.g. Nelson"}),n.lastName&&a.lastName&&r.a.createElement(T.a,{color:"red",style:L},n.lastName),r.a.createElement(D.a,{style:L,name:"email",type:"email",onChange:i,onBlur:o,value:t.email,placeholder:"Email. E.g. example@gmail.com"}),n.email&&a.email&&r.a.createElement(T.a,{color:"red",style:L},n.email),r.a.createElement(D.a,{style:L,name:"gender",onChange:i,onBlur:o,value:t.gender,placeholder:"Gender. E.g. MALE or FEMALE"}),n.gender&&a.gender&&r.a.createElement(T.a,{color:"red",style:L},n.gender),r.a.createElement(x.a,{onClick:function(){return s()},type:"submit",disabled:l||a&&!u},"Submit"))}))},G=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={students:[],isFetching:!1,isAddStuudentModalVisibility:!1},e.openAddStuudentModal=function(){return e.setState({isAddStuudentModalVisibility:!0})},e.closeAddStuudentModal=function(){return e.setState({isAddStuudentModalVisibility:!1})},e.fetchStudents=function(){e.setState({isFetching:!0}),E().then((function(t){return t.json().then((function(t){console.log(t),e.setState({students:t,isFetching:!1})}))})).catch((function(t){var n=t.error.message,a=t.error.error;k(n,a),e.setState({isFetching:!1})}))},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){this.fetchStudents()}},{key:"render",value:function(){var e=this,t=this.state,n=t.students,a=t.isFetching,i=t.isAddStuudentModalVisibility;if(a)return r.a.createElement("div",{className:"spinner"},r.a.createElement(I.a,{indicator:r.a.createElement(A.a,{style:{fontSize:24},spin:!0})}));var o=function(){return r.a.createElement("div",null,r.a.createElement(F.a,{title:"Add new student",visible:i,onOk:e.closeAddStuudentModal,onCancel:e.closeAddStuudentModal,cancelText:!0,okText:!0,width:1e3},r.a.createElement(B,{onSuccess:function(){e.closeAddStuudentModal(),e.fetchStudents(),b("success","Congratulation!","You successfully added new student")},onFailuer:function(e){var t=e.error.message,n=e.error.error;k(t,n)}})),r.a.createElement(C,{numberOfStudents:n.length,handleAddStudentClickEvent:e.openAddStuudentModal}))};if(n&&n.length){var c=[{title:"",key:"avatar",render:function(e,t){return r.a.createElement(O.a,{size:"large"},"".concat(t.firstName.charAt(0).toUpperCase()," ").concat(t.lastName.charAt(0).toUpperCase()))}},{title:"StudentId",dataIndex:"studentId",key:"studentId"},{title:"First Name",dataIndex:"firstName",key:"firstName"},{title:"Last Name",dataIndex:"lastName",key:"lastName"},{title:"Email",dataIndex:"email",key:"email"},{title:"Gender",dataIndex:"gender",key:"gender"},{title:"",key:"course",render:function(e,t){return r.a.createElement(d.b,{to:"/".concat(t.studentId,"/courses")},"Course")}},{title:"",key:"test",render:function(e,t){return r.a.createElement(d.b,{to:"/test"},"Test")}}];return r.a.createElement(S,null,r.a.createElement(g.a,{style:{marginBottom:"100px"},dataSource:n,columns:c,rowKey:"studentId",pagination:!1}),o())}return r.a.createElement(S,null,r.a.createElement(y.a,{style:{marginTop:"9em"},image:y.a.PRESENTED_IMAGE_SIMPLE,description:r.a.createElement("h1",null,"No student found")}),o(),";")}}]),n}(a.Component),P=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return r.a.createElement("div",null,"Test page")}}]),n}(a.Component),V=function(e){Object(s.a)(n,e);var t=Object(u.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return r.a.createElement(d.a,null,r.a.createElement(m.a,{exact:!0,path:"/",component:G}),r.a.createElement(m.a,{exact:!0,path:"/:studentId/courses",component:j}),r.a.createElement(m.a,{path:"/test",component:P}))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(d.a,null,r.a.createElement(V,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[202,1,2]]]);
//# sourceMappingURL=main.94433689.chunk.js.map