import './LogoLoader.css'

export default function LogoLoader() {
    return (
        <section id='logoLoader'>
            <img className='logoImage' src='./logo.png' alt='logo' width='100%'/>
            <div className='logoBar' style={{animationDelay: '0.3s'}}></div>
            <div className='logoBar' style={{animationDelay: '0.6s'}}></div>
            <div className='logoBar' style={{animationDelay: '0s'}}></div>
            <div className='logoBar' style={{animationDelay: '0.5s'}}></div>
            <div className='logoBar' style={{animationDelay: '0.1s'}}></div>
            <div className='logoBar' style={{animationDelay: '0.7s'}}></div>
            <div className='logoBar' style={{animationDelay: '0.3s'}}></div>
            <div className='logoBar' style={{animationDelay: '0.2s'}}></div>
            <div className='logoBar' style={{animationDelay: '0s'}}></div>
            <div className='logoBar' style={{animationDelay: '0.5s'}}></div>
            <div className='logoBar' style={{animationDelay: '0.1s'}}></div>
            <div className='logoBar' style={{animationDelay: '0.4s'}}></div>
        </section>
    )
}