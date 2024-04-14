import { useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from '../game/PhaserGame';
import { MainMenu } from '../game/scenes/MainMenu';
import { GameInfo } from '@/components/GameInfo';
import { PlayerInfo } from '@/components/PlayerInfo';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function App()
{
    const [canMoveSprite, setCanMoveSprite] = useState(true);

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    const changeScene = () => {

        if(phaserRef.current)
        {     
            const scene = phaserRef.current.scene as MainMenu;
            
            if (scene)
            {
                scene.changeScene();
            }
        }
    }

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {
        setCanMoveSprite(scene.scene.key !== 'MainMenu');
    }
    const account = useAccount()

    return (
        <div id="app">
           <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            <div className='flex flex-col p-4'>
                <GameInfo />
                <div className="my-6"><ConnectButton /></div>
                {account.isConnected && <PlayerInfo />}
                <div>
                    <button className="button" onClick={changeScene}>Change Scene</button>
                </div>
            </div>
        </div>
    )
}

export default App
