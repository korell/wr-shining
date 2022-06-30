import YouTubeToHtml5 from "@thelevicole/youtube-to-html5-loader";

export class Player {
    constructor(video) {

        this.getProgress = this.getProgress.bind(this)
        this.video = video
        this.video.style.display = 'none'
        this.isInit = false
        this.video.addEventListener('canplay', () => {
            // if(!this.isInit) {
            //     this.isInit = true
            //     this.playVideo()
            // }
        })
        this.video.addEventListener('pause', (ev) => {
            this.video.style.display = 'none'
            this.isPlaying = false
        })
        this.video.addEventListener('ended', (ev) => {
            this.isPlaying = false
        })

        document.body.addEventListener('click', () => {
            this.playVideo()
        })

        this.isPlaying = false

        this.initPlayer()
    }

    initPlayer() {
        this.player = new YouTubeToHtml5({
            withAudio: true
        })
    }

    getProgress() {
        if(this.video.currentTime >= 1.93) {
            this.video.pause()
        }
        if(this.isPlaying) {
            this.loop = requestAnimationFrame(this.getProgress)
        } else {
            cancelAnimationFrame(this.loop)
        }
    }

    playVideo() {
        if(!this.isPlaying) {
            this.video.currentTime = 0.1
            this.video.play()
            this.video.style.display = 'block'
            this.isPlaying = true
            this.getProgress()
        }
    }
}