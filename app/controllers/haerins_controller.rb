class HaerinsController < ApplicationController
  before_action :set_haerin, only: %i[ show edit update destroy ]

  # GET /haerins or /haerins.json
  def index
    @haerins = Haerin.all
  end

  # GET /haerins/1 or /haerins/1.json
  def show
  end

  # GET /haerins/new
  def new
    @haerin = Haerin.new
  end

  # GET /haerins/1/edit
  def edit
  end

  # POST /haerins or /haerins.json
  def create
    @haerin = Haerin.new(haerin_params)

    respond_to do |format|
      if @haerin.save
        format.html { redirect_to @haerin, notice: "Haerin was successfully created." }
        format.json { render :show, status: :created, location: @haerin }
      else
        format.html { render :new, status: :unprocessable_content }
        format.json { render json: @haerin.errors, status: :unprocessable_content }
      end
    end
  end

  # PATCH/PUT /haerins/1 or /haerins/1.json
  def update
    respond_to do |format|
      if @haerin.update(haerin_params)
        format.html { redirect_to @haerin, notice: "Haerin was successfully updated.", status: :see_other }
        format.json { render :show, status: :ok, location: @haerin }
      else
        format.html { render :edit, status: :unprocessable_content }
        format.json { render json: @haerin.errors, status: :unprocessable_content }
      end
    end
  end

  # DELETE /haerins/1 or /haerins/1.json
  def destroy
    @haerin.destroy!

    respond_to do |format|
      format.html { redirect_to haerins_path, notice: "Haerin was successfully destroyed.", status: :see_other }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_haerin
      @haerin = Haerin.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def haerin_params
      params.expect(haerin: [ :title, :description, :image ])
    end
end
