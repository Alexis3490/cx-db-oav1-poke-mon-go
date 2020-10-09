import mongoose, { Schema } from 'mongoose'

export default mongoose.model(
  'Pokemon',
  new Schema({
      number: Number,
      name: String,
      species: String,
      types: [String],
      abilities : {
          normal : [String],
          hidden : [String]
      },
      eggGroups: [String],
      gender: [String],
      height: String,
      weight: String,
      family: {
          id: Number,
          evolutionStage: Number,
          evolutionLine: [String]
      },
      starter: Boolean,
      legendary: Boolean,
      mythical: Boolean,
      ultraBeast: Boolean,
      mega: Boolean,
      gen: Number,
      sprite: String,
      description: String,
      id: Number,
      num: String,
      image: String,
      type: [String],
      candy: String,
      candy_count: Number,
      egg: String,
      spawn_chance: Number,
      avg_spawn: Number,
      spawn_time: String,
      multipliers: [String],
      weaknesses: [String],
      evolution: Array
  })
)
