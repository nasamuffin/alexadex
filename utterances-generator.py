phrases = [
    "WeaknessesIntent what is {FOO|Type} weak against\n",
	"WeaknessesIntent what {FOO|Type} is weak against\n",
    "WeaknessesIntent what are the weaknesses for {FOO|Type}\n",
	"WeaknessesIntent what the weaknesses are for {FOO|Type}\n",
    "WeaknessesIntent what does {FOO|Type} lose to\n",
	"WeaknessesIntent what {FOO|Type} loses to\n",
    "WeaknessesIntent what are {FOO|Type} weaknesses\n",
	"WeaknessesIntent what {FOO|Type} weaknesses are\n",
    "WeaknessesIntent what is super effective against {FOO|Type}\n",
    "WeaknessesIntent what deals the most damage to {FOO|Type}\n",
    "WeaknessesIntent what hurts {FOO|Type} the most\n",
    "WeaknessesIntent what types are {FOO|Type} weak against\n",
	"WeaknessesIntent what types {FOO|Type} are weak against\n",
    "WeaknessesIntent what types are {FOO|Type} weak to\n",
	"WeaknessesIntent what types {FOO|Type} are weak to\n",
    "WeaknessesIntent what should I use against {FOO|Type}\n",
	"WeaknessesIntent what I should use against {FOO|Type}\n",
    "WeaknessesIntent what should I attack {FOO|Type} with\n",
	"WeaknessesIntent what I should attack {FOO|Type} with\n",
    "WeaknessesIntent which attacks are good against {FOO|Type}\n",
    "WeaknessesIntent which types are good against {FOO|Type}\n",
	"StrengthsIntent what {FOO|Type} is strong against\n",
	"StrengthsIntent which types {FOO|Type} is strong against\n",
	"StrengthsIntent what {FOO|Type} is super effective against\n",
	"StrengthsIntent what {FOO|Type} deals the most damage to\n",
	"StrengthsIntent which types {FOO|Type} hurts the most\n",
	"StrengthsIntent what types I should use {FOO|Type} against\n",
	"StrengthsIntent which types {FOO|Type} are super effective against\n",
	"StrengthsIntent what {FOO|Type} is good against\n",
	"StrengthsIntent which types {FOO|Type} are good against\n"
]

#testing upload 3/6
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
