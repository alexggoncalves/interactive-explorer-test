import Element from "./Element";

function Content(props) {
    const musicAmount = 15;
    const musicList = [];

    for (var i = 0; i < musicAmount; i++) {
        musicList.push(1);
    }

    return (
        <group>
            {musicList.map((music,index) => (
                <Element key={index} position={{x: (Math.random()-0.5)*2500,y: (Math.random()-0.5)*2500}}/>
            ))}
        </group>
    );
}

export default Content;
