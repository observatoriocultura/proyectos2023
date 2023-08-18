var revisionesApp = createApp({
    data(){
        return{
            imagenes: imagenes,
            revisiones: revisiones,
            currentRevision: revisiones[0],
        }
    },
    methods: {
        setCurrent: function(key){
            this.currentRevision = this.revisiones[key]
        },
        classPrioridad: function(prioridad){
            return 'prioridad-' + prioridad.substring(0,1)
        },
    },
    mounted(){
        //this.currentRevision = 
    }
}).mount('#revisionesApp')