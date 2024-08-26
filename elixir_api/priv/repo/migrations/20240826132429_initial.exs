defmodule WhistleApi.Repo.Migrations.Initial do
  use Ecto.Migration

  def change do
    # USERS
    create table(:users) do
      add :username, :string
      add :email, :string
      add :location, :string
      add :phone, :string
      add :preferredSport, :string
      add :image, :binary
      timestamps()
    end

    # TOURNAMENTS
    create table(:tournaments) do
      add :user_id, references(:users)
      add :name, :string
      add :description, :string
      add :sport, :string
      add :date, :date
      add :location, :string
      add :image, :binary
      add :status, :boolean
      add :privacy, :boolean
      timestamps()
    end

    # TEAMS
    create table(:teams) do
      add :tournament_id, references(:tournaments), primary_key: true
      add :name, :string
      add :wins, :integer
      add :losses, :integer
      add :draws, :integer
      add :gf, :integer
      add :ga, :integer
      timestamps()
    end

    #GAMES
    create table(:games) do
      add :tournament_id, references(:tournaments), primary_key: true
      add :team_1, references(:teams, with: [id: :tournament_id])
      add :team_2, references(:teams, with: [id: :tournament_id])
      add :score_team_1, :integer
      add :score_team_2, :integer
    end

  end
end
