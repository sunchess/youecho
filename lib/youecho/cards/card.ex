defmodule Youecho.Cards.Card do
  use Ecto.Schema

  import Ecto.Query
  import Ecto.Changeset

  alias Youecho.Cards.Card
  alias Youecho.Repo


  schema "cards" do
    field :title, :string
    field :translate, :string
    field :iterate_count, :integer, default: 0
    field :example, :string

    timestamps()
  end

  @doc false
  def changeset(card, attrs) do
    card
    |> cast(attrs, [:title, :translate, :example])
    |> validate_required([:title, :translate])
  end

  def increment(id) do
    from(c in Card, update: [inc: [iterate_count: 1]], where: c.id == ^id)
    |> Repo.update
  end
end
