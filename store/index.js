export const state = () => ({
    user:null,
    journals:[]
  })
 
export const getters = {
	getUserEmail(state){
		return state.user.email;
	},
	getJournals(state){
		return state.journals
	}
}
export const mutations = {
	ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
	  if (!authUser) {
	    state.user=null;
	  } else {
	    const { uid, email, emailVerified } = authUser
    	state.user = { uid, email, emailVerified }
	  }
	},
	ADD_PAGE(state,data){
		if(data){
			state.journals.push(data)
		}
	},
	FETCH_PAGES(state,journals){
		if(	journals){
			state.journals = journals
			console.log("mutation Journals stored in state")
		}
	}
}
export const actions = {
	onAuthStateChangedAction: (ctx, { authUser, claims }) => {
	  if (!authUser) {
	    
	  } else {
	    // Do something with the authUser and the claims object...
	  }
	},
	addPage(ctx,content){
		var page_content = content.content;
		let db = this.$fire.firestore;
		// console.log("email",ctx.getters.getUserEmail);
		db.collection(`${ctx.getters.getUserEmail}`)
		.add({
			date: content.date,
			content: content.content
		})
		.then((docRef)=>{
			console.log("Doc added",docRef);
			// ctx.commit("ADD_PAGE",{
			// 	id: content.date,
			// 	data: {
			// 		date: content.date,
			// 		content: content.content
			// 	}
			// })
		})
		.catch((error) => {
		    console.error("Error writing document: ", error);
		});
	},
	async fetchPages(ctx){
		// console.log(ctx.getters,"context");
		let journals = [];
		let pagesRef = this.$fire.firestore.collection(`${ctx.getters.getUserEmail}`);
		await pagesRef.get()
			.then((querySnapshot)=>{
				querySnapshot.forEach((doc)=>{
					console.log(doc.id,'=>',doc.data());
					journals.push({
						"id":doc.id,
						"data":doc.data()
					})
				})
			})
		// console.log("test")
		ctx.commit('FETCH_PAGES',journals);
		
	}
}