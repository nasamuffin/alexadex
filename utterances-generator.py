phrases = [
    "WeaknessesIntent what is {FOO|Type} weak against\n",
    "WeaknessesIntent what are the weaknesses for {FOO|Type}\n",
    "WeaknessesIntent what does {FOO|Type} lose to\n",
    "WeaknessesIntent what are {FOO|Type}'s weaknesses\n",
    "WeaknessesIntent what is super effective against {FOO|Type}\n",
    "WeaknessesIntent what deals the most damage to {FOO|Type}\n",
    "WeaknessesIntent what hurts {FOO|Type} the most\n",
    "WeaknessesIntent what types are {FOO|Type} weak against\n",
    "WeaknessesIntent what types are {FOO|Type} weak to\n",
    "WeaknessesIntent what should I use against {FOO|Type}\n",
    "WeaknessesIntent what should I attack {FOO|Type} with\n",
    "WeaknessesIntent which attacks are good against {FOO|Type}\n",
    "WeaknessesIntent which types are good against {FOO|Type}\n"
]
types = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy"
]
output = open('utterances.txt', 'w')

for phrase in phrases:
    for type in types:
        output.write(phrase.replace("FOO", type))

output.close()
