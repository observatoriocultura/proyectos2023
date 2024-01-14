var maxAsistentes = 130;
var widthBase = 800;
var heightBase = 500;

// VueApp
//-----------------------------------------------------------------------------
var filbo2023App = createApp({
    data() {
        return {
            section: 'heatMap',
            dias: data_dias,
            currentDia: 0,
            horas: data_horas,
            currentHora: 0,
            conteos: data_conteos,
            zonas: data_zonas,
            displayLabels: true,
            playing: false,
            intervalAnimation: null,
            speeds: [{
                    label: '0.5',
                    miliseconds: 2000
                },
                {
                    label: '0.75',
                    miliseconds: 1500
                },
                {
                    label: '1',
                    miliseconds: 1000
                },
                {
                    label: '1.25',
                    miliseconds: 750
                },
            ],
            playingSpeed: 1000,
        }
    },
    methods: {
        setDia: function(keyDia) {
            this.currentDia = keyDia
        },
        setHora: function(keyHora) {
            this.currentHora = keyHora
        },
        asistentesPercent: function(asistentes) {
            return Pcrn.intPercent(asistentes, maxAsistentes);
        },
        labelPosition: function(zona) {
            return 'top: ' + zona[5] + 'px; left: ' + zona[6] + 'px;';
        },
        classAsistentes: function(conteo) {
            zona = this.zonas.find(item => item[0] == conteo[4])
            factor = conteo[5] / zona[7]
            if (factor < 0.1) return 'text-muted'
            if (factor < 0.5) return 'text-info'
            if (factor < 1) return 'text-primary'
            if (factor < 1.5) return 'text-warning'
            if (factor >= 1.5) return 'text-danger'
            return 'text-light'
        },
        playConteos: function() {
            this.playing = true
            this.intervalAnimation = setInterval(() => {
                this.goToConteo(1)
            }, this.playingSpeed);
        },
        goToConteo: function(sumHora) {
            this.currentHora += sumHora
            if (this.currentHora > 8) {
                this.currentHora = 0
                this.currentDia++
            }
            if (this.currentHora < 0) {
                console.log('pre', this.currentDia)
                this.currentHora = this.horas.length
                this.currentDia--
                console.log('post', this.currentDia)
            }
            if (this.currentDia >= this.dias.length) {
                this.currentDia = 0
                this.currentHora = 0
            }
            if (this.currentDia < 0) {
                this.currentDia = 0
                this.currentHora = 0
            }
        },
        pauseConteos: function() {
            this.playing = false
            clearInterval(this.intervalAnimation)
        },
        setSpeed: function(miliseconds) {
            this.playingSpeed = miliseconds
        },
        setSection: function(newSection){
            this.section = newSection
            //history.pushState(null, null, URL_APP + 'data_science/filbo2023/' + this.section)
        },
    },
    computed: {
        currentImg() {
            return this.dias[this.currentDia][0] + '_' + this.horas[this.currentHora][0] + '.jpg'
        },
        currentMomento() {
            return this.dias[this.currentDia][0] + '_' + this.horas[this.currentHora][0]
        },
    },
    mounted() {
        //this.getList()
    }
}).mount('#filbo2023App')