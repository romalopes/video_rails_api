# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require "faker"

Post.destroy_all

5.times do |i|
  Post.create!(
    title: "Roma - Post #{i + 1}",
    body: "roma - This is the content of post number #{i + 1}."
  )
end

20.times do |i|
  Post.create!(
    title: "#{i + 1} - #{Faker::Lorem.sentence(word_count: 3)} ",
    body: "Roma - #{Faker::Lorem.paragraph(sentence_count: 5)}"
  )
end

puts "#{Post.count} posts created."

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
